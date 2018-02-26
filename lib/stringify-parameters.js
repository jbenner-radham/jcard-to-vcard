'use strict';

const escapeVcardPropertyValue = require('escape-vcard-property-value');
const isArray = Array.isArray;

module.exports = (parameters) => {
    let params = [];

    for (let parameter in parameters) {
        let value = parameters[parameter];
        let stringified = `${parameter.toUpperCase()}=`;

        stringified += (isArray(value)) ? value.map(escapeVcardPropertyValue).join(',')
                                        : escapeVcardPropertyValue(value);

        params.push(stringified);
    }

    return params;
};
