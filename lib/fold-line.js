'use strict';

/**
 * Get the number of bytes of a sliced line.
 * @param {string} line
 * @param {number} sliceIndex
 * @returns {number}
 */
function getSlicedByteSize(line, sliceIndex) {
    const slicedLine = line.slice(0, sliceIndex);

    return Buffer.byteLength(slicedLine);
}

/**
 * Splits a line into an array.
 * @param {string} line
 * @param {number} sliceIndex
 * @returns {string[]}
 */
function splitLine(line, sliceIndex) {
    const lines = [];
    const slicedLine = line.slice(sliceIndex);

    lines.push(line.slice(0, sliceIndex));

    if (slicedLine) {
        lines.push(` ${slicedLine}`);
    }

    return lines;
}

/**
 * Folds a line if it is over the max octets limit.
 * @param {string} line
 * @returns {string}
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-3.2
 */
module.exports = (line) => {
    const CRLF = '\r\n';
    const MAX_OCTETS = 75;

    let sliceIndex = MAX_OCTETS;

    while (line.charAt(sliceIndex) === ' ' || getSlicedByteSize(line, sliceIndex) > MAX_OCTETS) {
        --sliceIndex;
    }

    const lines = splitLine(line, sliceIndex);

    /** TODO: Address potential child string byte overages. */
    // while (!isValidOctetSize(_.last(lines))) {
    //     [...]
    // }

    return lines.join(CRLF);
};
