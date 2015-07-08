'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

exports['default'] = function (value) {
    /** PROTIP: The order of this chain is very important! */
    return value.replace('\\', '\\\\').replace(',', '\\,').replace(';', '\\;').replace(/\n/g, '\\n');
};

module.exports = exports['default'];