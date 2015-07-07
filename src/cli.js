'use strict';

require('babel/polyfill');

var chalk = require('chalk');
var fs    = require('fs');
var is    = require('is_js');

var isValidOctetSize = require('./lib/is-valid-octet-size.js');
var isVcardProperty   = require('./lib/is-vcard-property.js');
var vco = require('./lib/vcard.js');

const CRLF       = '\r\n';
const MAX_OCTETS = 75;

var source = fs.readFileSync(process.argv[2]).toString();
var jcard  = JSON.parse(source).pop();
var vcard  = [ 'BEGIN:VCARD' ];

jcard.forEach(item => {
    let components = [];

    // Using array destructuring now...
    let [prop, param, type, val] = item;

    /** `contentline = [group "."] name *(";" param) ":" value CRLF` */
    let line      = `${prop}`;
    let valueType = null;

    try {
        let definition = `${__dirname}/../data/property/${prop.toLowerCase()}.json`;
        valueType = require(definition).value;
    } catch (_e) {}

    let property = new vco.Property({
        name:       prop,
        parameters: param,
        value:      val,
        valueType:  valueType
    });

    // [!!!]
    console.log(chalk.green(JSON.stringify(property, null, 4)));
    // console.log(property.toString());

    function escapePropertyValue(str) {
        /** PROTIP: The order of this chain is very important! */
        return str.replace('\\', '\\\\')
            .replace(',', '\\,')
            .replace(';', '\\;')
            .replace(/\n/g, '\\n');
    }

    if (is.not.empty(param)) {
        for (let component in param) {
            let buf = `${component.toUpperCase()}=`;
            buf += is.array(param[component]) ? param[component].map(escapePropertyValue).join(',')
                                              : escapePropertyValue(param[component]);
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
            components.push(`VALUE=${type}`);
        }
    } else if (type !== 'text' &&
        !(prop === 'BDAY' && type === 'date-and-or-time') &&
        !(prop === 'LANG' && type === 'language-tag') &&
        !(prop === 'REV'  && type === 'timestamp')
    ) {
        line += `;TYPE=${type}`;
    }

    if (is.not.empty(components)) {
        line += `;${components.join(';')}`;
    }

    // Join "Structured Property Values" on applicable properties
    // <https://html.spec.whatwg.org/multipage/microdata.html#escaping-the-vcard-text-string>
    // ---
    // @see [RFC6350], Section 3.4 "Property Value Escaping"
    line += ':';
    line += ['ADR', 'GENDER', 'N', 'ORG'].includes(prop) && is.array(val) /* alternately: `Array.isArray(val)` */
        ? val.join(';')
        : val;

    if (!isValidOctetSize(line)) {
        console.error(
            `${chalk.red.bold('[ERROR]')} ` +
            `The line "${chalk.red(line)}" ` +
            `is ${chalk.bold.red(Buffer.byteLength(line))} octets. ` +
            `A maximum of ${chalk.bold(MAX_OCTETS)} octets are allowed per line.`
        );
        //-// process.exit(1);
    }

    vcard.push(line);
});

vcard[vcard.length] = `VCARD:END${CRLF}`;

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
