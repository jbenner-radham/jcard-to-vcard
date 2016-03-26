'use strict';

let is                  = require('is_js');
let collapseDateTime    = require('collapse-date-time');
let escapePropertyValue = require('../escape-property-value');
let isVcardDateTimeType = require('is-vcard-date-time-type');
let stringifyParameters = require('../stringify-parameters');

const MAX_OCTETS_PER_LINE = 75;

function Property(p) {
    p               = p            || {};
    this.name       = p.name       || null;
    this.parameters = p.parameters || null;
    this.value      = p.value      || null;

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
    isValidOctetSize () {
        return (Buffer.byteLength(this.line) <= MAX_OCTETS_PER_LINE);
    },
    toString () {
        let params = [];
        let schema = require(
            `../../data/property/${this.name.toLowerCase()}.json`
        );

        if (is.not.empty(this.parameters)) {
            params.push(stringifyParameters(this.parameters));
        }

        if (this.valueType !== schema.valueType) {
            params.push(`VALUE=${this.valueType}`);
        }

        params = (is.empty(params)) ? '' : `;${params.join(';')}`;

        let value = (this.valueType === 'text' && is.array(this.value)) ?
            this.value.map(escapePropertyValue).join(';')
            : escapePropertyValue(this.value);

        if (isVcardDateTimeType(this.valueType)) {
            /**
             * jCard supports ISO 8601 "extended format" however vCard does not
             * so collapse any date/time types.
             *
             * @see [RFC6350], Section 4.3
             */
            value = collapseDateTime(value);
        }

        return `${this.name.toUpperCase()}${params}:${value}`;
    }
};

module.exports = Property;
