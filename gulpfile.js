'use strict';

const eslint = require('gulp-eslint');
const micro = require('gulp-micro');
const { src } = require('gulp');

module.exports.default = function() {
    return src('lib/**/*.js')
        .pipe(micro({limit: 2500}))
        .pipe(eslint())
        .pipe(eslint.failAfterError());
};
