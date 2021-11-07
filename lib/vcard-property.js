'use strict';

const collapseDateTime = require('collapse-date-time');
const escapeVcardPropertyValue = require('escape-vcard-property-value');
const isArray = Array.isArray;
const isVcardDateTimeType = require('is-vcard-date-time-type');
const VcardPropertyParameters = require('./vcard-property-parameters');

/**
 * @property {string} name
 * @property {object} parameters
 * @property {string|string[]} value
 * @property {string} valueType
 */
class VcardProperty {
    constructor(property) {
        this.name = property.name;
        this.parameters = property.parameters;
        this.value = property.value;
        this.valueType = property.valueType.toLowerCase();
    }

    getEscapedValue() {
        return escapeVcardPropertyValue(this.value);
    }

    getEscapedValues() {
        return this.value.map(escapeVcardPropertyValue);
    }

    hasDateTimeType() {
        return isVcardDateTimeType(this.valueType);
    }

    toString() {
        const parameters = new VcardPropertyParameters(this).toString();
        let value = (isArray(this.value) && this.valueType === 'text')
            ? this.getEscapedValues().join(';')
            : this.getEscapedValue();

        if (this.hasDateTimeType()) {
            /**
             * jCard supports ISO 8601 "extended format" however vCard does not
             * so collapse any date/time types.
             *
             * @see [RFC6350], Section 4.3
             */
            value = collapseDateTime(value);
        }

        return `${this.name.toUpperCase()}${parameters}:${value}`;
    }
}

module.exports = VcardProperty;
