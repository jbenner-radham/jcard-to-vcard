'use strict';

require('babel/polyfill');

var chalk           = require('chalk');
var fs              = require('fs');
var is              = require('is_js');
var isVcardProperty = require('./lib/is-vcard-property.js');

const CRLF = '\r\n';
var source = fs.readFileSync(process.argv[2]).toString();
var jcard  = JSON.parse(source).pop();
var vcard  = [ 'BEGIN:VCARD' ];

jcard.forEach(item => {
    let components = [];
    let prop       = item[0].toUpperCase();
    let param      = item[1];
    let type       = item[2];
    let val        = item[3];

    /** `contentline = [group "."] name *(";" param) ":" value CRLF` */
    let line = `${prop}`;

    // -- console.info(chalk.green(type));

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
            components.push(`VALUE=${type}`);
        }
    } else if (prop === 'URL') {
        /*console.log(JSON.stringify({
            prop:  prop,
            param: param,
            type:  type,
            val:   val,
            _line: line
        }, null, 4));*/
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
    // "Property Value Escaping"
    // <http://tools.ietf.org/html/rfc6350#section-3.4>
    line += ':';
    line += ['ADR', 'GENDER', 'N', 'ORG'].includes(prop) && is.array(val) /* alternately: `Array.isArray(val)` */
        ? val.join(';') // .replace(/\n/g, '\\n').replace(',', '\\,').replace('\\', '\\\\')
        : val;

    /**
     * > Content lines SHOULD be folded to a maximum width of 75 octets,
     * > excluding the line break.  Multi-octet characters MUST remain
     * > contiguous.
     * @see [RFC 6350 sec. 3.2 "Line Delimiting and Folding"]{@link http://www.rfc-editor.org/info/rfc6350}
     */
    if (Buffer.byteLength(line) > 75) {
        console.warn(
            `${chalk.red.bold('[ERROR]')} ` +
            `The line "${chalk.red.underline(line)}" ` +
            `is ${chalk.bold.red(Buffer.byteLength(line))} octets. ` +
            'The maximum allowed is ' + `${chalk.bold(75)}.`
        );
    }

    vcard.push(line);
});

/**
 * ```abnf
 * "END:VCARD" CRLF`
 * ```
 */
vcard[vcard.length] = `VCARD:END${CRLF}`;

process.stdout.write(vcard.join(CRLF));
