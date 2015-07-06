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
    _keys: function () {
        return Object.keys(this);
    },

    isValidOctetSize: function () {
        return (Buffer.byteLength(line) <= MAX_OCTETS_PER_LINE);
    },

    toString: function () {
        return `${this.name.toUpperCase()}: [...]`;
    }
};

module.exports = Property;
