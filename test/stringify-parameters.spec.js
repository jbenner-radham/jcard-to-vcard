'use strict';

const { expect } = require('chai');
const stringifyParameters = require('../lib/stringify-parameters');
const VcardProperty = require('../lib/vcard-property');

describe('stringifyParameters', () => {
    it('is a function', () => {
        expect(stringifyParameters).to.be.a('function');
    });

    it('returns an array of strings', () => {
        const property = new VcardProperty({
            name: 'tel',
            parameters: { type: ['home', 'voice'] },
            value: 'tel:+1-404-555-1212',
            valueType: 'uri'
        });
        const actual = stringifyParameters(property.parameters).every(parameter => typeof parameter === 'string');
        const expected = true;

        expect(actual).to.equal(expected);
    });

    it('returns a stringified "TYPE" parameter when passed a "tel" property', () => {
        const property = new VcardProperty({
            name: 'tel',
            parameters: { type: ['home', 'voice'] },
            value: 'tel:+1-404-555-1212',
            valueType: 'uri'
        });
        const actual = stringifyParameters(property.parameters);
        const expected = ['TYPE=home,voice'];

        expect(actual).to.equal(expected);
    });
});
