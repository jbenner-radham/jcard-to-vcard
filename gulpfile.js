'use strict';

const eslint = require('gulp-eslint');
const gulp   = require('gulp');
const micro  = require('gulp-micro');

gulp.task('js', () => {
    return gulp.src('lib/**/*.js')
        .pipe(micro({limit: 2500}))
        .pipe(eslint())
        .pipe(eslint.failAfterError());
});

gulp.task('default', ['js']);
