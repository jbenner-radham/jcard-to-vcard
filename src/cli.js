'use strict';

var fs       = require('fs');
var is       = require('is_js');
var dateTime = require('@radioactivehamster/date-time');

const CRLF = '\r\n';
var source = fs.readFileSync(process.argv[2]).toString();
var jcard  = JSON.parse(source).pop();

/**
 * vCard:
 * @see http://tools.ietf.org/html/rfc6350
 *
 * jCard:
 * @see http://tools.ietf.org/html/rfc7095
 */
var vcard = [ 'BEGIN:VCARD' ];

jcard.forEach(item => {
    var prop  = item[0].toUpperCase();
    var param = item[1];
    var type  = item[2];
    var val   = item[3];
    var line  = `${prop}:`;

    /**
     * > If the property's value type is the default type for that property, no
     * > "VALUE" parameter is included.
     */
    if (prop === 'TEL') {
        line += `VALUE=${type};TYPE="${param.type.join(',')}":`;
    } else if (prop === 'RELATED') {
        line += `TYPE=${param.type};`;
    } else if (type !== 'text' &&
        !(prop === 'BDAY' && type === 'date-and-or-time') &&
        !(prop === 'LANG' && type === 'language-tag') &&
        !(prop === 'REV'  && type === 'timestamp')
    ) {
        line += `TYPE=${type};`;
    }

    line += (prop === 'ADR' || prop === 'N' || prop === 'ORG') ? val.join(';')
                                                               : val;

    // Escape commas
    vcard.push(line.replace(',', '\\,'));
});

/**
 * ```abnf
 * "END:VCARD" CRLF`
 * ```
 */
vcard[vcard.length] = `VCARD:END${CRLF}`;

process.stdout.write(vcard.join(CRLF));
