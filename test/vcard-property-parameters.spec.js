'use strict';

const { expect } = require('chai');
const VcardPropertyParameters = require('../lib/vcard-property-parameters');

describe('VcardPropertyParameters', () => {
    it('is a function class', () => {
        expect(VcardPropertyParameters).to.be.a('function');
    });

    describe('#toString', () => {
        it('is a function', () => {
            expect(VcardPropertyParameters.prototype.toString).to.be.a('function');
        });

        it('returns a string', () => {
            const property = {
                name: 'tel',
                parameters: { type: [ 'home', 'voice' ] },
                value: 'tel:+1-404-555-1212',
                valueType: 'uri'
            };

            expect(new VcardPropertyParameters(property).toString()).to.be.a('string');
        });

        it('stringifies a type parameter', () => {
            const property = {
                name: 'tel',
                parameters: { type: [ 'home', 'voice' ] },
                value: 'tel:+1-404-555-1212',
                valueType: 'uri'
            };
            const expected = ';TYPE=home,voice;VALUE=uri';

            expect(new VcardPropertyParameters(property).toString()).to.equal(expected);
        });
    });
});
