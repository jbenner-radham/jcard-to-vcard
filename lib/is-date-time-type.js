'use strict';

module.exports = (type) => {
    return ['date', 'time', 'date-time', 'date-and-or-time', 'timestamp']
        .includes(type);
};
