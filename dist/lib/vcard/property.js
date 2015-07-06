'use strict';

var MAX_OCTETS_PER_LINE = 75;

function Property() {
    var p = arguments[0] === undefined ? {} : arguments[0];

    // -- this.line       = null;
    this.name = p.name || null;
    this.parameters = p.parameters || null;
    this.value = p.value || null;
    this.valueType = p.valueType || null;
}

Property.prototype = {
    _keys: function _keys() {
        return Object.keys(this);
    },

    isValidOctetSize: function isValidOctetSize() {
        return Buffer.byteLength(line) <= MAX_OCTETS_PER_LINE;
    },

    toString: function toString() {
        return this.name.toUpperCase() + ': [...]';
    }
};

module.exports = Property;