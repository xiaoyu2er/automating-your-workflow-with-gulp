var gulp = require('gulp');
var sass = require('gulp-sass');
var chalk = require('chalk');
var del = require('del');
var path = require('path');

var config = {
    scssPath: '*.scss',
    buildDir: 'build/'
};


gulp.task('del', function () {
    return del(config.buildDir);
});

gulp.task('scss', function () {
    return gulp.src(config.scssPath)
        .pipe(sass())
        .pipe(gulp.dest(config.buildDir));
});

gulp.task('watch', function () {
    var watcher = gulp.watch(config.scssPath, gulp.task('scss'));
    watcher.on('add', (filePath) => console.log(chalk.blue('add', filePath)));
    watcher.on('change', (filePath) => console.log(chalk.green('change', filePath)));
    watcher.on('unlink', (filePath) => {
        console.log(chalk.red('delete', filePath));
        var src = path.relative(path.resolve('.'), filePath);
        src = src.replace(/.scss$/, '.css');
        var dest = path.resolve(config.buildDir, src);
        return del(dest);
    });

});

gulp.task('default', gulp.series('del', 'scss', 'watch'));
