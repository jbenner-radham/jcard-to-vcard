'use strict';

var babel = require('gulp-babel');
var gulp  = require('gulp');
var micro = require('gulp-micro');

gulp.task('js', () => {
    return gulp.src('src/**/*.js')
        .pipe(babel())
        .pipe(micro({limit: 2500}))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['js']);
