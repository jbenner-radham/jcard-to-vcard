'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

require('babel/polyfill');

var chalk = require('chalk');
var fs = require('fs');
var is = require('is_js');

var isValidOctetSize = require('./lib/is-valid-octet-size.js');
var isVcardProperty = require('./lib/is-vcard-property.js');
var vco = require('./lib/vcard.js');

var CRLF = '\r\n';
var MAX_OCTETS = 75;

var source = fs.readFileSync(process.argv[2]).toString();
var jcard = JSON.parse(source).pop();
var vcard = ['BEGIN:VCARD'];

jcard.forEach(function (item) {
    var components = [];

    // Using array destructuring now...

    var _item = _slicedToArray(item, 4);

    var prop = _item[0];
    var param = _item[1];
    var type = _item[2];
    var val = _item[3];

    /** `contentline = [group "."] name *(";" param) ":" value CRLF` */
    var line = '' + prop;
    // let valueType = null;

    /*try {
        let schema = require(
            `${__dirname}/../data/property/${prop.toLowerCase()}.json`
        );
    } catch (_e) {}*/

    var property = new vco.Property({
        name: prop,
        parameters: param,
        value: val,
        valueType: type
    });

    // [!!!]
    console.log(chalk.green(JSON.stringify(property, null, 4)));
    console.log(chalk.yellow(property.toString()));

    function escapePropertyValue(str) {
        /** PROTIP: The order of this chain is very important! */
        return str.replace('\\', '\\\\').replace(',', '\\,').replace(';', '\\;').replace(/\n/g, '\\n');
    }

    if (is.not.empty(param)) {
        for (var component in param) {
            var buf = component.toUpperCase() + '=';
            buf += is.array(param[component]) ? param[component].map(escapePropertyValue).join(',') : escapePropertyValue(param[component]);
            components.push(buf);
        }
    }

    if (['date', 'time', 'date-time', 'date-and-or-time', 'timestamp'].includes(type)) {
        /**
         * jCard supports ISO 8601 "extended format" however vCard does not
         * so collapse any date/time types.
         *
         * @see [RFC6350], Section 4.3
         */
        val = val.replace(/-/g, '');
    }

    /**
     * > If the property's value type is the default type for that property, no
     * > "VALUE" parameter is included.
     * [is this an actual quote ???????]
     */
    if (prop === 'TEL') {
        if (type == 'uri') {
            components.push('VALUE=' + type);
        }
    } else if (type !== 'text' && !(prop === 'BDAY' && type === 'date-and-or-time') && !(prop === 'LANG' && type === 'language-tag') && !(prop === 'REV' && type === 'timestamp')) {
        line += ';TYPE=' + type;
    }

    if (is.not.empty(components)) {
        line += ';' + components.join(';');
    }

    // Join "Structured Property Values" on applicable properties
    // <https://html.spec.whatwg.org/multipage/microdata.html#escaping-the-vcard-text-string>
    // ---
    // @see [RFC6350], Section 3.4 "Property Value Escaping"
    line += ':';
    line += ['ADR', 'GENDER', 'N', 'ORG'].includes(prop) && is.array(val) /* alternately: `Array.isArray(val)` */
    ? val.join(';') : val;

    if (!isValidOctetSize(line)) {
        console.error(chalk.red.bold('[ERROR]') + ' ' + ('The line "' + chalk.red(line) + '" ') + ('is ' + chalk.bold.red(Buffer.byteLength(line)) + ' octets. ') + ('A maximum of ' + chalk.bold(MAX_OCTETS) + ' octets are allowed per line.'));
        //-// process.exit(1);
    }

    vcard.push(line);
});

vcard[vcard.length] = 'VCARD:END' + CRLF;

process.stdout.write(vcard.join(vco.CRLF));

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