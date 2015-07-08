'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (dateTime) {
  /**
   * jCard supports ISO 8601 "extended format" however vCard does not
   * so collapse any date/time types.
   *
   * @see [RFC6350], Section 4.3
   */
  return dateTime.replace(/-/g, '').replace(/:/g, '');
}

/**
 * Normative References
 * --------------------
 *
 * [RFC6350] Perreault, S., "vCard Format Specification", RFC 6350,
 *           DOI 10.17487/RFC6350, August 2011,
 *           <http://www.rfc-editor.org/info/rfc6350>.
 */
;

module.exports = exports['default'];