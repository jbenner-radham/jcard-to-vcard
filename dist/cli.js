'use strict';

require('babel/polyfill');

var chalk = require('chalk');
var fs = require('fs');
var is = require('is_js');

var isValidOctetWidth = require('./lib/is-valid-octet-width.js');
var isVcardProperty = require('./lib/is-vcard-property.js');
var vco = require('./lib/vcard.js');

var CRLF = '\r\n';
var MAX_OCTETS = 75;

var source = fs.readFileSync(process.argv[2]).toString();
var jcard = JSON.parse(source).pop();
var vcard = ['BEGIN:VCARD'];

jcard.forEach(function (item) {
    var components = [];
    var prop = item[0].toUpperCase();
    var param = item[1];
    var type = item[2];
    var val = item[3];

    /** `contentline = [group "."] name *(";" param) ":" value CRLF` */
    var line = '' + prop;
    var valueType = null;

    try {
        var definition = __dirname + '/../data/property/' + prop.toLowerCase() + '.json';
        valueType = require(definition).value;
        // -- console.log(chalk.bold.yellow(valueType));
    } catch (_e) {}

    /*let property = {
        name:      prop,
        parameter: param,
        value:     val,
        'value-type': valueType
    };*/

    var property = new vco.Property({
        name: prop,
        parameters: param,
        value: val,
        valueType: valueType
    });

    console.log(chalk.green(JSON.stringify(property, null, 4)));
    console.log(property.toString());
    // console.log(chalk.yellow(new vco.Oh()._keys()));

    // -- console.info(chalk.green(type));

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
        // console.info(chalk.bold.underline(`${prop}: ${val}`));
        /**
         * jCard supports ISO 8601 "extended format" however vCard does not
         * so collapse any date/time types.
         */
        val = val.replace(/-/g, '');
    }

    /**
     * > If the property's value type is the default type for that property, no
     * > "VALUE" parameter is included.
     */
    if (prop === 'TEL') {
        if (type == 'uri') {
            components.push('VALUE=' + type);
        }
    } else if (prop === 'URL') {} else if (type !== 'text' && !(prop === 'BDAY' && type === 'date-and-or-time') && !(prop === 'LANG' && type === 'language-tag') && !(prop === 'REV' && type === 'timestamp')) {
        line += ';TYPE=' + type;
    }

    if (is.not.empty(components)) {
        line += ';' + components.join(';');
    }

    // Join "Structured Property Values" on applicable properties
    // <https://html.spec.whatwg.org/multipage/microdata.html#escaping-the-vcard-text-string>
    // ---
    // "Property Value Escaping"
    // <http://tools.ietf.org/html/rfc6350#section-3.4>
    line += ':';
    line += ['ADR', 'GENDER', 'N', 'ORG'].includes(prop) && is.array(val) /* alternately: `Array.isArray(val)` */
    ? val.join(';') : val;

    if (!isValidOctetWidth(line)) {
        console.error(chalk.red.bold('[ERROR]') + ' ' + ('The line "' + chalk.red(line) + '" ') + ('is ' + chalk.bold.red(Buffer.byteLength(line)) + ' octets. ') + ('A maximum of ' + chalk.bold(MAX_OCTETS) + ' octets are allowed per line.'));
        process.exit(1);
    }

    vcard.push(line);
});

vcard[vcard.length] = 'VCARD:END' + CRLF;

process.stdout.write(vcard.join(vco.CRLF));

/*console.log(JSON.stringify({
    prop:  prop,
    param: param,
    type:  type,
    val:   val,
    _line: line
}, null, 4));*/