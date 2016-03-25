'use strict';

let gulp  = require('gulp');
let micro = require('gulp-micro');

gulp.task('js', () => {
    return gulp.src('lib/**/*.js')
        .pipe(micro({limit: 2500}));
});

gulp.task('default', ['js']);
