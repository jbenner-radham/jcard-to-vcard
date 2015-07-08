'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var _libIsValidOctetSizeJs = require('./lib/is-valid-octet-size.js');

var _libIsValidOctetSizeJs2 = _interopRequireDefault(_libIsValidOctetSizeJs);

var _libIsVcardPropertyJs = require('./lib/is-vcard-property.js');

var _libIsVcardPropertyJs2 = _interopRequireDefault(_libIsVcardPropertyJs);

var _libVcardJs = require('./lib/vcard.js');

var _libVcardJs2 = _interopRequireDefault(_libVcardJs);

require('babel/polyfill');

var MAX_OCTETS = 75;

var source = _fs2['default'].readFileSync(process.argv[2]).toString();
var jcard = JSON.parse(source).pop();
var vcard = ['BEGIN:VCARD'];

jcard.forEach(function (item) {
    var _item = _slicedToArray(item, 4);

    var prop = _item[0];
    var param = _item[1];
    var type = _item[2];
    var val = _item[3];

    /**
     * Change the `Property` contructor to use array destructing since the jCard
     * properties will always be in the same order and structure?
     */
    var property = new _libVcardJs2['default'].Property({
        name: prop,
        parameters: param,
        value: val,
        valueType: type
    });

    var line = property.toString();

    if (!(0, _libIsValidOctetSizeJs2['default'])(line)) {
        console.error(_chalk2['default'].red.bold('[ERROR]') + ' ' + ('The line "' + _chalk2['default'].red(line) + '" ') + ('is ' + _chalk2['default'].bold.red(Buffer.byteLength(line)) + ' octets. ') + ('A maximum of ' + _chalk2['default'].bold(MAX_OCTETS) + ' octets are allowed per line.'));
        // -// process.exit(1);
    }

    vcard.push(line);
});

vcard.push('VCARD:END' + _libVcardJs2['default'].CRLF);
process.stdout.write(vcard.join(_libVcardJs2['default'].CRLF));

/**
 * Normative References
 * --------------------
 *
 * [RFC6350] Perreault, S., "vCard Format Specification", RFC 6350,
 *           DOI 10.17487/RFC6350, August 2011,
 *           <http://www.rfc-editor.org/info/rfc6350>.
 *
 * [RFC7095] Kewisch, P., "jCard: The JSON Format for vCard", RFC 7095,
 *           DOI 10.17487/RFC7095, January 2014,
 *           <http://www.rfc-editor.org/info/rfc7095>.
 */