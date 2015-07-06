'use strict';

module.exports = (line) => {
    /**
     * > Content lines SHOULD be folded to a maximum width of 75 octets,
     * > excluding the line break. Multi-octet characters MUST remain contiguous.
     * @see [RFC 6350 sec. 3.2 "Line Delimiting and Folding"]{@link http://www.rfc-editor.org/info/rfc6350}
     */
    const MAX_OCTETS = 75;

    return (Buffer.byteLength(line) <= MAX_OCTETS);
};
