'use strict';

const stringifyParameters = require('./stringify-parameters');
const is = require('is_js');

module.exports = class VcardPropertyParameters {
    constructor(property) {
        this.property = property;
    }

    toString() {
        let parameters = [];
        let schema = require(`../data/property/${this.property.name.toLowerCase()}.json`);

        if (is.not.empty(this.property.parameters)) {
            parameters.push(stringifyParameters(this.property.parameters));
        }

        if (this.property.valueType !== schema.valueType) {
            parameters.push(`VALUE=${this.property.valueType}`);
        }

        return (!is.empty(parameters)) ? `;${parameters.join(';')}` : '';
    }
};
