var gulp = require('gulp');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var sass = require('gulp-sass');
var gulpIf = require('gulp-if');
var cleanCSS = require('gulp-clean-css');
var argv = require('yargs').argv;
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');

var config = {
    scssPath: ['./test.scss'],
    buildDir: 'build/',
    sourcemaps: argv.s || argv.sourcemaps,
    minify: argv.minify
};

console.log('sourcemaps?', config.sourcemaps, 'minify?', config.minify);

gulp.task('scss', function () {
    return gulp.src(config.scssPath)
        .pipe(gulpIf(config.sourcemaps, sourcemaps.init()))
        .pipe(sass())
        .pipe(gulpIf(config.minify, cleanCSS()))
        .pipe(gulpIf(config.sourcemaps, sourcemaps.write('.')))
        .pipe(gulp.dest(config.buildDir));
});

gulp.task('clean', function () {
    return del(config.buildDir);
});

gulp.task('default', gulp.series('clean', 'scss'));