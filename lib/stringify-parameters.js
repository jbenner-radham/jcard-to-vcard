'use strict';

let is                       = require('is_js');
let escapeVcardPropertyValue = require('escape-vcard-property-value');

module.exports = (parameters) => {
    let params = [];

    for (let parameter in parameters) {
        let value       = parameters[parameter];
        let stringified = `${parameter.toUpperCase()}=`;

        stringified += (is.array(value)) ? value.map(escapeVcardPropertyValue).join(',')
                                         : escapeVcardPropertyValue(value);
        params.push(stringified);
    }

    return params;
};
