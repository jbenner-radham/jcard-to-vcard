'use strict';

import _ from 'lodash';
import isValidOctetSize from './is-valid-octet-size.js';

module.exports = (line) => {
    const CRLF = '\r\n';
    const MAX_OCTETS = 75;

    let lines = [];

    function getSlicedParentByteSize(line, sliceIndex) {
        let slice = line.slice(0, sliceIndex);

        return Buffer.byteLength(slice);
    }

    function splitLine(line, sliceIndex) {
        let lines = [];
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

    let contentLine = lines.join(CRLF);

    return contentLine;
};
