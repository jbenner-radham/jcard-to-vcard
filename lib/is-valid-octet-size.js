'use strict';

module.exports = (line) => {
    /**
     * > Content lines SHOULD be folded to a maximum width of 75 octets,
     * > excluding the line break. Multi-octet characters MUST remain contiguous.
     * >
     * > -- _[RFC6350], Sec. 3.2 "Line Delimiting and Folding"_
     */
    const MAX_OCTETS = 75;

    return (Buffer.byteLength(line) <= MAX_OCTETS);
};
