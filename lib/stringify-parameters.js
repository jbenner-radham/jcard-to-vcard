'use strict';

let is                  = require('is_js');
let escapePropertyValue = require('./escape-property-value');

module.exports = (parameters) => {
    let params = [];

    for (let parameter in parameters) {
        let value       = parameters[parameter];
        let stringified = `${parameter.toUpperCase()}=`;

        stringified += (is.array(value)) ? value.map(escapePropertyValue).join(',')
                                         : escapePropertyValue(value);
        params.push(stringified);
    }

    return params;
};
