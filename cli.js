'use strict';

const chalk            = require('chalk');
const foldLine         = require('./lib/fold-line');
const fs               = require('fs');
const is               = require('is_js');
const isValidOctetSize = require('./lib/is-valid-octet-size');
const isVcardProperty  = require('./lib/is-vcard-property');
const VcardProperty    = require('./lib/vcard-property');

const CRLF = '\r\n';

let source = fs.readFileSync(process.argv[2]).toString();
let jcard  = JSON.parse(source).pop();
let vcard  = [ 'BEGIN:VCARD' ];

jcard.forEach(item => {
    // let [prop, param, type, val] = item;
    let name       = item[0];
    let parameters = item[1];
    let type       = item[2];
    let value      = item[3];

    let property = new VcardProperty({
        name:       name,
        parameters: parameters,
        value:      value,
        valueType:  type
    });

    let line = property.toString();

    if (!isValidOctetSize(line)) {
        line = foldLine(line);
    }

    vcard.push(line);
});

vcard.push(`VCARD:END${CRLF}`);
process.stdout.write(vcard.join(CRLF));

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
