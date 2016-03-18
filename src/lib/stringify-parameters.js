'use strict';

import chalk from 'chalk';
import is from 'is_js';
import escapePropertyValue from './escape-property-value';

export default function (parameters) {
    // - // console.info(chalk.blue(JSON.stringify(parameters)));

    let params = [];

    for (let parameter in parameters) {
        let value       = parameters[parameter];
        let stringified = `${parameter.toUpperCase()}=`;

        stringified += (is.array(value)) ? value.map(escapePropertyValue).join(',')
                                         : escapePropertyValue(value);
        params.push(stringified);
    }

    return params;
}