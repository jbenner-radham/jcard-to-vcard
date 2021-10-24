'use strict';

/**
 * Folds a line if it is over the max octets limit.
 * @param {string} line
 * @returns {string}
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-3.2
 */
module.exports = (line) => {
    const CRLF = '\r\n';
    const MAX_OCTETS = 75;

    const lines = [];

    function getSlicedParentByteSize(line, sliceIndex) {
        const slicedLine = line.slice(0, sliceIndex);

        return Buffer.byteLength(slicedLine);
    }

    function splitLine(line, sliceIndex) {
        const lines = [];
        const slicedLine = line.slice(sliceIndex);

        lines.push(line.slice(0, sliceIndex));

        if (slicedLine) {
            lines.push(` ${slicedLine}`);
        }

        return lines;
    }

    let sliceIndex = MAX_OCTETS;

    while (line.charAt(sliceIndex) === ' ' || getSlicedParentByteSize(line, sliceIndex) > MAX_OCTETS) {
        --sliceIndex;
    }

    // Merge the two arrays.
    [].push.apply(lines, splitLine(line, sliceIndex));

    /** TODO: Address potential child string byte overages. */
    // while (!isValidOctetSize(_.last(lines))) {
    //     [...]
    // }

    const contentLine = lines.join(CRLF);

    return contentLine;
};
