'use strict';

export default function (type) {
    return ['date', 'time', 'date-time', 'date-and-or-time', 'timestamp']
        .includes(type);
}
