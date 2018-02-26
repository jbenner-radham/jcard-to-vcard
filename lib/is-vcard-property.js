'use strict';

const fs = require('fs');
const getJsonBasename = require('get-json-basename');
const isJsonFile = require('is-json-file');

module.exports = function (property) {
    return fs.readdirSync(`${__dirname}/../../data/property/`)
        .filter(isJsonFile)
        .map(getJsonBasename)
        .includes(property.toLowerCase());
};
