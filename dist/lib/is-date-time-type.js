'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

exports['default'] = function (type) {
    return ['date', 'time', 'date-time', 'date-and-or-time', 'timestamp'].includes(type);
};

module.exports = exports['default'];