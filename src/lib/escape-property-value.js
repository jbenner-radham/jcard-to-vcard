'use strict';

export default function (value) {
    /** PROTIP: The order of this chain is very important! */
    return value.replace('\\', '\\\\')
        .replace(',', '\\,')
        .replace(';', '\\;')
        .replace(/\n/g, '\\n');
}
