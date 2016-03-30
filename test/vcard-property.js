'use strict';

const expect        = require('chai').expect;
const VcardProperty = require('../lib/vcard-property');

describe('vCard Property', () => {
    let vcardProperty = new VcardProperty({
        name:       'fn',
        parameters: {},
        value:      'John Smith',
        valueType:  'text'
    });

    it('should have a property named "name"', () => {
        expect(vcardProperty).to.have.property('name');
    });

    it('should have a property named "parameters"', () => {
        expect(vcardProperty).to.have.property('parameters');
    });

    it('should have a property named "value"', () => {
        expect(vcardProperty).to.have.property('value');
    });

    it('should have a property named "valueType"', () => {
        expect(vcardProperty).to.have.property('valueType');
    });

    it('should not escape an `fn` with the value of "John Smith"', () => {
        expect(vcardProperty.getEscapedValue()).to.equal('John Smith');
    });

    it('should transform to "FN:John Smith" when cast to a string and provided a `fn` with the value of "John Smith"', () => {
        expect(vcardProperty.toString()).to.equal('FN:John Smith');
    });

    it('should report that `fn` is not a date/time type', () => {
        expect(vcardProperty.hasDateTimeType()).to.equal(false);
    });
});
