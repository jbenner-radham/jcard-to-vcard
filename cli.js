'use strict';

require('babel/polyfill');

import chalk from 'chalk';
import foldLine from './lib/fold-line.js';
import fs from 'fs';
import is from 'is_js';
import isValidOctetSize from './lib/is-valid-octet-size.js';
import isVcardProperty from './lib/is-vcard-property.js';
import vco from './lib/vcard.js';

const MAX_OCTETS = 75;

let source = fs.readFileSync(process.argv[2]).toString();
let jcard  = JSON.parse(source).pop();
let vcard  = [ 'BEGIN:VCARD' ];

jcard.forEach(item => {
    let [prop, param, type, val] = item;

    /**
     * Change the `Property` contructor to use array destructing since the jCard
     * properties will always be in the same order and structure?
     */
    let property = new vco.Property({
        name:       prop,
        parameters: param,
        value:      val,
        valueType:  type
    });

    let line = property.toString();

    if (!isValidOctetSize(line)) {
        line = foldLine(line);
    }

    vcard.push(line);
});

vcard.push(`VCARD:END${vco.CRLF}`);
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
