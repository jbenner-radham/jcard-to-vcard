'use strict';

import is from 'is_js';

const MAX_OCTETS_PER_LINE = 75;

function Property(p = {}) {
    this.name       = p.name       || null;
    this.parameters = p.parameters || null;
    this.value      = p.value      || null;

    try {
        let schema = require(
            `${__dirname}/../../../data/property/` +
            `${p.name.toLowerCase()}.json`
        );
        this.valueType = schema.valueType;
        // console.log(is.array(this.valueType));
        // console.log(schema);
    } catch (_e) {}

    // TODO: Need to figure out how we name the value-type in the schema
    //       especially for handling multiprofile value-types like with `RELATED`.
    // this.valueType = p.valueType || this.valueType;
}

Property.prototype = {
    isValidOctetSize() {
        return (Buffer.byteLength(this.line) <= MAX_OCTETS_PER_LINE);
    },
    toString() {
        return `${this.name.toUpperCase()}: [...]`;
    }
};

module.exports = Property;

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
