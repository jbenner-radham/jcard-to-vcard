'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _escapePropertyValue = require('./escape-property-value');

var _escapePropertyValue2 = _interopRequireDefault(_escapePropertyValue);

exports['default'] = function (parameters) {
    var params = [];

    for (var parameter in parameters) {
        var value = parameters[parameter];
        var stringified = parameter.toUpperCase() + '=';

        stringified += _is_js2['default'].array(value) ? value.map(_escapePropertyValue2['default']).join(',') : (0, _escapePropertyValue2['default'])(value);
        params.push(stringified);
    }

    return params;
};

module.exports = exports['default'];