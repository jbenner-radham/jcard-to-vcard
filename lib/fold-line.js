'use strict';

module.exports = (line) => {
    const CRLF = '\r\n';
    const MAX_OCTETS = 75;

    let lines = []; // eslint-disable-line prefer-const

    function getSlicedParentByteSize(line, sliceIndex) {
        const slice = line.slice(0, sliceIndex);

        return Buffer.byteLength(slice);
    }

    function splitLine(line, sliceIndex) {
        let lines = []; // eslint-disable-line prefer-const

        lines.push(line.slice(0, sliceIndex));
        lines.push(` ${line.slice(sliceIndex)}`);

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
