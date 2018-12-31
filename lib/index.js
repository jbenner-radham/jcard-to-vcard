'use strict';

const foldLine = require('./fold-line');
const isValidOctetSize = require('./is-valid-octet-size');
const VcardProperty = require('./vcard-property');

module.exports = function (jcard) {
    const CRLF = '\r\n';

    let vcard = ['BEGIN:VCARD']; // eslint-disable-line prefer-const

    jcard.pop().forEach(item => {
        const [name, parameters, valueType, value] = item;
        const property = new VcardProperty({name, parameters, value, valueType});
        let line = property.toString();

        if (!isValidOctetSize(line)) {
            line = foldLine(line);
        }

        vcard.push(line);
    });

    vcard.push(`END:VCARD${CRLF}`);

    return vcard.join(CRLF);
};
