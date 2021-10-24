'use strict';

const { expect } = require('chai');
const foldLine = require('../lib/fold-line');

const CRLF = '\r\n';

describe('foldLine', () => {
    it('is a function', () => {
        expect(foldLine).to.be.a('function');
    });

    it('returns a string', () => {
        expect(foldLine('')).to.be.a('string');
    });

    it('folds a line which is 89 octets', () => {
        const line = 'FN:A fictitious person that is super duper awesome and a great example of too many octets';
        const expected = `FN:A fictitious person that is super duper awesome and a great example of t${CRLF} oo many octets`;

        expect(foldLine(line)).to.equal(expected);
    });

    it('folds a line which is 76 octets', () => {
        const line = 'FN:A person whose FN is 76 octets!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!';
        const expected = `FN:A person whose FN is 76 octets!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!${CRLF} !`;

        expect(foldLine(line)).to.equal(expected);
    });

    it('does not fold a line which is 75 octets or less', () => {
        const line = 'FN:A person whose FN is 75 octets!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!';

        expect(foldLine(line)).to.equal(line);
    });
});
