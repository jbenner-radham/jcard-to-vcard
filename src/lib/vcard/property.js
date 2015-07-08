'use strict';

import chalk from 'chalk';
import is from 'is_js';
import collapseDateTime from '../collapse-date-time.js';
import escapePropertyValue from '../escape-property-value';
import isDateTimeType from '../is-date-time-type.js';
import stringifyParameters from '../stringify-parameters';

const MAX_OCTETS_PER_LINE = 75;

function Property(p = {}) {
    this.name       = p.name       || null;
    this.parameters = p.parameters || null;
    this.value      = p.value      || null;

    try {
        let schema = require(
            `${__dirname}/../../../data/property/${p.name.toLowerCase()}.json`
        );
    } catch (_e) {}

    // TODO: Need to figure out how we name the value-type in the schema
    //       especially for handling multiprofile value-types like with `RELATED`.
    //
    // > The type identifier string of the value, in lowercase.  It is
    // > important that parsers check this to determine the data type of
    // > the value and that they do not rely on assumptions.  For example,
    // > for structured values, the data type will be "array" (!!! <- NEED TO VERIFY !!!).
    // ---
    // [RFC7095], Section 3.3 "Properties (RFC 6350, Section 6)"
    this.valueType = p.valueType.toLowerCase();
}

Property.prototype = {
    isValidOctetSize() {
        return (Buffer.byteLength(this.line) <= MAX_OCTETS_PER_LINE);
    },
    toString() {
        let params = [];
        let schema = require(
            `${__dirname}/../../../data/property/${this.name.toLowerCase()}.json`
        );

        if (is.not.empty(this.parameters)) {
            params.push(stringifyParameters(this.parameters));
        }

        if (this.valueType !== schema.valueType) {
            params.push(`VALUE=${this.valueType}`);
        }

        params = (is.empty(params)) ? '' : `;${params.join(';')}`;

        let value = (this.valueType === 'text' && is.array(this.value))
            ? this.value.map(escapePropertyValue).join(';')
            : escapePropertyValue(this.value);

        if (isDateTimeType(this.valueType)) {
            value = collapseDateTime(value)
        }

        return `${this.name.toUpperCase()}${params}:${value}`;
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
