'use strict';

const { expect } = require('chai');
const isValidOctetSize = require('../lib/is-valid-octet-size');

describe('isValidOctetSize', () => {
    it('is a function', () => {
        expect(isValidOctetSize).to.be.a('function');
    });

    it('returns a boolean', () =>  {
        expect(isValidOctetSize('')).to.be.a('boolean');
    });

    it('returns true when passed a string consisting of 1 octet', () => {
        expect(isValidOctetSize('!')).to.equal(true);
    });

    it('returns true when passed a string consisting of 75 octets', () => {
        expect(isValidOctetSize('!'.repeat(75))).to.equal(true);
    });

    it('returns false when passed a string consisting of 76 octets', () => {
        expect(isValidOctetSize('!'.repeat(76))).to.equal(false);
    });
});
