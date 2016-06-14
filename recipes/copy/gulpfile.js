var gulp = require('gulp');

var config = {
    copyPath: ['test.html'],
    buildDir: 'build/'
};


gulp.task('default', function () {
    return gulp.src(config.copyPath)
        .pipe(gulp.dest(config.buildDir));
});