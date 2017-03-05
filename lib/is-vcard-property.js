'use strict';

const fs   = require('fs');
const path = require('path');

module.exports = (prop) => {
    function getJsonBasename(file) {
        return path.basename(file, '.json');
    }

    function isJsonFile(resource) {
        return path.extname(resource) === '.json';
    }

    /* fs.readdirSync(`${__dirname}/../../data/property/`)
        .filter(resource => path.extname(resource) === '.json')
        .map(file => path.basename(file, '.json')) */

    return fs.readdirSync(`${__dirname}/../../data/property/`)
            .filter(isJsonFile)
            .map(getJsonBasename)
            .includes(prop.toLowerCase());
};
