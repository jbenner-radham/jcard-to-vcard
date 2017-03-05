'use strict';

const foldLine         = require('./fold-line');
const isValidOctetSize = require('./is-valid-octet-size');
const VCardProperty    = require('./vcard-property');

module.exports = function (jcard) {
    const CRLF = '\r\n';

    let vcard = ['BEGIN:VCARD'];

    jcard.pop().forEach(item => {
        let [name, parameters, valueType, value] = item;

        let property = new VCardProperty({name, parameters, value, valueType});
        let line     = property.toString();

        if (!isValidOctetSize(line)) {
            line = foldLine(line);
        }

        vcard.push(line);
    });

    vcard.push(`VCARD:END${CRLF}`);

    return vcard.join(CRLF);
};
