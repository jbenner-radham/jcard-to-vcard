'use strict';

const escapeVcardPropertyValue = require('escape-vcard-property-value');
const isArray = Array.isArray;

/**
 * Takes a parameters object and returns a stringified array of those parameters.
 * @param {Object} parameters
 * @returns {string[]}
 */
module.exports = (parameters) => {
    const params = [];

    for (const parameter in parameters) {
        const value = parameters[parameter];
        let stringified = `${parameter.toUpperCase()}=`;

        stringified += (isArray(value))
            ? value.map(escapeVcardPropertyValue).join(',')
            : escapeVcardPropertyValue(value);

        params.push(stringified);
    }

    return params;
};
