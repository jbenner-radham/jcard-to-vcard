'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

var MAX_OCTETS_PER_LINE = 75;

function Property() {
    var p = arguments[0] === undefined ? {} : arguments[0];

    this.name = p.name || null;
    this.parameters = p.parameters || null;
    this.value = p.value || null;

    try {
        var schema = require(__dirname + '/../../../data/property/' + (p.name.toLowerCase() + '.json'));
        // this.valueType = schema.valueType;
        // console.log(is.array(this.valueType));
        // console.log(schema);
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
    isValidOctetSize: function isValidOctetSize() {
        return Buffer.byteLength(this.line) <= MAX_OCTETS_PER_LINE;
    },
    toString: function toString() {
        var params = undefined;
        var schema = require(__dirname + '/../../../data/property/' + (this.name.toLowerCase() + '.json'));

        console.log(this.valueType + ' === ' + schema.valueType, this.valueType === schema.valueType);

        params = this.valueType === schema.valueType ? '' : ';VALUE=' + this.valueType;

        return '' + this.name.toUpperCase() + params + ':' + this.value;
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