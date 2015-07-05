'use strict';

require('babel/polyfill');

var fs = require('fs');
var is = require('is_js');
var isVcardProperty = require('./lib/is-vcard-property.js')


const CRLF = '\r\n';
var source = fs.readFileSync(process.argv[2]).toString();
var jcard  = JSON.parse(source).pop();
var vcard  = [ 'BEGIN:VCARD' ];

jcard.forEach(item => {
    var prop  = item[0].toUpperCase();
    var param = item[1];
    var type  = item[2];
    var val   = item[3];
    var line  = `${prop}`;

    let components = [];

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

    /**
     * > If the property's value type is the default type for that property, no
     * > "VALUE" parameter is included.
     */
    if (prop === 'TEL') {
        // line += `;TYPE=${param.type.join(',')};VALUE=${type}`;
        if (type == 'uri') {
            components.push(`VALUE=${type}`);
        }
    } else if (prop === 'RELATED') {
        // line += `;TYPE=${param.type}`;
    } else if (prop === 'PHOTO') {
        // if (is.existy(param.mediatype)) {
        //     line += `;MEDIATYPE=${param.mediatype}`;
        // }
    } else if (type !== 'text' &&
        !(prop === 'BDAY' && type === 'date-and-or-time') &&
        !(prop === 'LANG' && type === 'language-tag') &&
        !(prop === 'REV'  && type === 'timestamp')
    ) {
        line += `;TYPE=${type}`;
    }

    if (is.not.empty(components)) {
        line += `;${components.join(';')}`;
        // line += `;${components.join(';').replace(',', '\\,').replace('\\', '\\\\')}`; /* `.replace(';', '\\;')` */
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
     * @see Perreault, S., "vCard Format Specification", RFC 6350
     *      § 3.2 "Line Delimiting and Folding"
     *      DOI 10.17487/RFC6350, August 2011,
     *      <http://www.rfc-editor.org/info/rfc6350>.
     */
    if (Buffer.byteLength(line) > 75) {
        // ...
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
