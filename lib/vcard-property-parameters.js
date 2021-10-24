'use strict';

const stringifyParameters = require('./stringify-parameters');

module.exports = class VcardPropertyParameters {
    constructor(property) {
        this.property = property;
    }

    toString() {
        const parameters = [];
        const schema = require(`../data/property/${this.property.name.toLowerCase()}.json`);

        if (Object.keys(this.property.parameters).length) {
            parameters.push(stringifyParameters(this.property.parameters));
        }

        if (this.property.valueType !== schema.valueType) {
            parameters.push(`VALUE=${this.property.valueType}`);
        }

        return (parameters.length) ? `;${parameters.join(';')}` : '';
    }
};
