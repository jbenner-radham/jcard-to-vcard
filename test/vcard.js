'use strict';

let expect = require('chai').expect;
let vcard  = require('../lib/vcard');

describe('vCard', () => {
    it('should have property "Property"', () => {
        expect(vcard).to.have.property('Property');
    });
});
