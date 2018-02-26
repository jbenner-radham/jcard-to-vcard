#!/usr/bin/env node

'use strict';

const fs = require('fs');
const jcardToVcard = require('./lib');

let filename = process.argv[2];
let source = fs.readFileSync(filename).toString();
let jcard = JSON.parse(source);
let vcard = jcardToVcard(jcard);

process.stdout.write(vcard);

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
