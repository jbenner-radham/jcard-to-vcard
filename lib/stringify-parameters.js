'use strict';

const escapeVcardPropertyValue = require('escape-vcard-property-value');
const isArray = Array.isArray;

module.exports = (parameters) => {
    let params = []; // eslint-disable-line prefer-const

    for (const parameter in parameters) {
        const value = parameters[parameter];
        let stringified = `${parameter.toUpperCase()}=`;

        stringified += (isArray(value)) ? value.map(escapeVcardPropertyValue).join(',')
                                        : escapeVcardPropertyValue(value); // eslint-disable-line indent


        params.push(stringified);
    }

    return params;
};
