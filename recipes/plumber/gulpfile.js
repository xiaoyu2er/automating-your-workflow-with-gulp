var gulp = require('gulp');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var sass = require('gulp-sass');


var config = {
    scssPath: ['./test.scss'],
    buildDir: 'build/'
};


gulp.task('scss', function () {
    return gulp.src(config.scssPath)
        .pipe(customerPlumber('Running Scss')) // 尝试去掉这一行
        .pipe(sass())
        .pipe(gulp.dest(config.buildDir))
});
gulp.task('watch', function () {
    gulp.watch(config.scssPath, gulp.task('scss'));
});

gulp.task('default', gulp.series('scss', 'watch'));

/**
 * 自定义通知
 * @param errTitle
 * @returns {*}
 */
function customerPlumber(errTitle) {
    return plumber({
        errorHandler: notify.onError({
            title: errTitle || 'Error running Gulp',
            message: 'Error: <%= error.message %>',
            /**
             * sound options:
             * Basso, Blow, Bottle, Frog,
             * Funk, Glass, Hero, Morse, Ping,
             * Pop, Purr, Sosumi, Submarine, Tink
             */
            sound: 'Glass'
        })
    });
}