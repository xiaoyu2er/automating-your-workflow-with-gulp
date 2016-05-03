var gulp = require('gulp');
var del = require('del');
var inject = require('gulp-inject');
var order = require("gulp-order");
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var size = require('gulp-size');
var rev = require('gulp-rev');
var htmlmin = require('gulp-htmlmin');
var cached = require('gulp-cached');
var sass = require('gulp-sass');
var iife = require('gulp-iife');
var print = require('gulp-print');
var eventStream = require('event-stream');
var ngAnnotate = require('gulp-ng-annotate');
var ngTemplates = require('gulp-ng-templates');


var buildDir = 'build/';
var config = {
    buildDir: buildDir,
    cssPath: ['src/css/**/*.css'],
    sassPath: ['src/css/**/*.scss'],
    jsPath: ['src/js/**/*.js'],

    imgPath: ['src/img/**/*'],
    libPath: ['src/lib/**/*'],
    tplPath: ['src/views/**/*.tpl.html'],
    indexPath: 'src/index.html',

    buildIgnorePath: 'build/',
    cssInjectPath: [buildDir + 'css/**/*.css'],
    jsInjectPath: [buildDir + 'lib/**/*.js', buildDir + 'js/**/*.js'],
    jsOrder: [
        'lib/**/*',
        'js/app.js',
        'js/templates.js',
        'js/filters/**/*.js',
        'js/services/**/*.js',
        'js/**/*.js'
    ]
};

/**
 * 删除build目录下的所有文件
 */
gulp.task('clean', function () {
    return del(config.buildDir);
});

/**
 * 拷贝.css文件到build目录下
 */
gulp.task('css', function () {
    return gulp.src(config.cssPath, {base: 'src'})
        .pipe(gulp.dest(config.buildDir));
});


/**
 * 编译.scss文件到build目录下
 */
gulp.task('sass', function () {
    return gulp.src(config.sassPath, {base: 'src'})
        .pipe(sass())
        .pipe(gulp.dest(config.buildDir))
});

/**
 * 为.js文件添加angular的注解, 且包裹一个立即执行函数,输出到build目录
 */
gulp.task('js', function () {
    return gulp.src(config.jsPath, {base: 'src'})
        .pipe(ngAnnotate())
        .pipe(iife({
            useStrict: false,
            trimCode: true,
            prependSemicolon: true
        }))
        .pipe(gulp.dest(config.buildDir))
});
/**
 * 拷贝图片和lib下的文件到build目录
 */
gulp.task('assets', function () {
    return gulp.src(config.imgPath.concat(config.libPath), {base: 'src'})
        .pipe(gulp.dest(config.buildDir));
});


/**
 * 将angular的模板文件经ngTemplate处理合并为一个js文件, 输出到build/js目录下
 */
gulp.task('tpl', function () {
    return gulp.src(config.tplPath)
        .pipe(ngTemplates({
            filename: 'js/templates.js',
            module: 'app'
        }))
        .pipe(gulp.dest(config.buildDir));

});

/**
 * 将css,js文件插入到index.html中, 注意js的顺序, 输出到build目录下
 * 注意, 这里使用了 event-stream将css, js两个文件流合并为一个, 从而省去了一次操作;
 * 注意, 由于js文件间有依赖关系, 所以js文件流的后面添加了一部print操作, 可以在调试的时候打开, 这样可以看到文件的排序结果;
 */
gulp.task('inject', function () {
    var cssStream = gulp.src(config.cssInjectPath, {read: false, base: config.buildDir});
    var jsStream = gulp.src(config.jsInjectPath, {read: false, base: config.buildDir})
        .pipe(order(config.jsOrder));

    var allStream = eventStream.merge(cssStream, jsStream);

    return gulp.src(config.indexPath)
        .pipe(inject(allStream, {
            ignorePath: config.buildIgnorePath,
            addRootSlash: false
        }))
        .pipe(gulp.dest(config.buildDir));

});
/**
 * build是一个组合任务, 首先执行clean操作; 然后并行执行 css, sass, js, assets, tpl任务, 最后进行inject操作;
 */
gulp.task('build', gulp.series('clean', gulp.parallel('css', 'sass', 'js', 'assets', 'tpl'), 'inject'));

/**
 * 监听文件变化
 */
gulp.task('watch', function () {
    gulp.watch(config.imgPath.concat(config.libPath), gulp.series('assets'));
    gulp.watch(config.cssPath, gulp.series('css', 'inject'));
    gulp.watch(config.sassPath, gulp.series('sass', 'inject'));
    gulp.watch(config.jsPath, gulp.series('js', 'inject'));
    gulp.watch(config.tplPath, gulp.series('tpl', 'inject'));
    gulp.watch(config.indexPath, gulp.series('inject'));

});

/**
 * 默认任务, 先build, 再watch
 */

gulp.task('default', gulp.series('build', 'watch'));


// ========== 以上是开发阶段的任务 ===================

// ========== 以下是部署阶段的任务 ===================

/**
 * 将css与编译好的sass文件合并压缩;
 * 添加sourcemaps
 * 还可以添加诸如autoprefixer等插件
 */
gulp.task('compile:css', function () {

    var cssStream = gulp.src(config.cssPath);
    var sassStream = gulp.src(config.sassPath)
        .pipe(sass());

    return eventStream.merge(cssStream, sassStream)
        .pipe(sourcemaps.init())
        .pipe(concat('css/all.min.css'))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.buildDir));
});

/**
 * 将js文件添加angular注解,和立即执行函数, 和template文件合并压缩;
 * 并且生成sourcemaps
 */
gulp.task('compile:js', function () {
    var jsStream = gulp.src(config.jsPath, {base: 'src'})
        .pipe(sourcemaps.init())
        .pipe(ngAnnotate())
        .pipe(iife({
            useStrict: false,
            trimCode: true,
            prependSemicolon: true
            // params: ["window", "document", "$", "undefined"],
            // args: ["window", "document", "jQuery"]
        }));
    var tplStream = gulp.src(config.tplPath)
        .pipe(ngTemplates({
            filename: 'js/templates.js',
            module: 'app'
        }));

    return eventStream.merge(jsStream, tplStream)
        .pipe(order(config.jsOrder))
        .pipe(concat('js/all.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.buildDir))
});

/**
 * 拷贝资源到build目录
 * 这里可以根据实际情况对不同的资源进行不同的处理
 * 比如对image进行压缩处理等
 */
gulp.task('compile:assets', function () {
    return gulp.src(config.imgPath.concat(config.libPath), {base: 'src'})
        .pipe(gulp.dest(config.buildDir));
});

/**
 * 将css,js文件插入到index.html中, 注意js的顺序, 输出到build目录下
 */
gulp.task('compile:inject', function () {
    var cssStream = gulp.src(config.cssInjectPath, {read: false, base: config.buildDir});

    var jsStream = gulp.src(config.jsInjectPath, {read: false, base: config.buildDir})
        .pipe(order(config.jsOrder));
    // .pipe(print());

    var allStream = eventStream.merge(cssStream, jsStream);

    return gulp.src(config.indexPath)
        .pipe(inject(allStream, {
            ignorePath: config.buildIgnorePath,
            addRootSlash: false
        }))
        .pipe(gulp.dest(config.buildDir));

});


gulp.task('compile', gulp.series('clean', gulp.parallel('compile:assets', 'compile:css', 'compile:js'), 'compile:inject'));
