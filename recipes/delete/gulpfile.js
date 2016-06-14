var gulp = require('gulp');
var del = require('del');

var config = {
    copyPath: ['test.html'],
    buildDir: 'build/'
};

gulp.task('copy', function () {
    return gulp.src(config.copyPath)
        .pipe(gulp.dest(config.buildDir));
});

gulp.task('del', function () {
    return del(config.buildDir
        // ,  {force: true}
    )
});