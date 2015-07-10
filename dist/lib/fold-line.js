'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _isValidOctetSizeJs = require('./is-valid-octet-size.js');

var _isValidOctetSizeJs2 = _interopRequireDefault(_isValidOctetSizeJs);

exports['default'] = function (line) {
    var CRLF = '\r\n';
    var MAX_OCTETS = 75;

    var lines = [];

    function getSlicedParentByteSize(line, sliceIndex) {
        var slice = line.slice(0, sliceIndex);

        return Buffer.byteLength(slice);
    }

    function splitLine(line, sliceIndex) {
        var lines = [];
        lines.push(line.slice(0, sliceIndex));
        lines.push(' ' + line.slice(sliceIndex));

        return lines;
    }

    var sliceIndex = MAX_OCTETS;

    while (line.charAt(sliceIndex) === ' ' || getSlicedParentByteSize(line, sliceIndex) > MAX_OCTETS) {
        --sliceIndex;
    }

    // Merge the two arrays.
    [].push.apply(lines, splitLine(line, sliceIndex));

    /** TODO: Address potential child string byte overages. */
    // while (!isValidOctetSize(_.last(lines))) {
    //     [...]
    // }

    var contentLine = lines.join(CRLF);

    return contentLine;
};

module.exports = exports['default'];