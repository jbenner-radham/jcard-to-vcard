'use strict';

const MAX_OCTETS_PER_LINE = 75;

function Property(p = {}) {
    // -- this.line       = null;
    this.name       = p.name       || null;
    this.parameters = p.parameters || null;
    this.value      = p.value      || null;
    this.valueType  = p.valueType  || null;
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
