'use strict';

let _ = require('lodash');

module.exports = (type) => {
    // return ['date', 'time', 'date-time', 'date-and-or-time', 'timestamp']
    //     .includes(type);
    let dateTimeTypes = [
        'date',
        'date-and-or-time',
        'date-time',
        'time',
        'timestamp'
    ];

    return _.includes(dateTimeTypes, type);
};
