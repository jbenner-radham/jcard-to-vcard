'use strict';

var babel = require('gulp-babel');
var gulp  = require('gulp');

gulp.task('js', () => {
    return gulp.src('src/*.js')
        .pipe(babel())
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['js']);
