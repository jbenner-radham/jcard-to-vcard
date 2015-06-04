#!/usr/bin/env node

'use strict';

var fs = require('fs');
var is = require('is_js');
var dateTime = require('@radioactivehamster/date-time');

const CRLF = '\r\n';

//console.log(process.argv);
var source = fs.readFileSync(process.argv[2], { encoding: 'utf8' });
var jcard = JSON.parse(source).pop();
///console.log(jcard);

var vcard = [ 'BEGIN:VCARD' ];

jcard.forEach(function (item) {
    var prop  = item[0].toUpperCase();
    var param = item[1];
    var type  = item[2];
    var val   = item[3];
    //console.log(prop.toUpperCase());
    ///if (Object.keys(param).length === 0) console.log('nope');
    ///else console.log('yep');

    var line = `${prop}:`;

    if (type !== 'text' && !(prop === 'LANG' && type === 'language-tag') &&
        !(prop === 'REV' && type === 'timestamp')
    ) {
        line += `TYPE=${type};`;
    } else if (prop === 'RELATED') {
        line += `TYPE=${param.type};`;
    }

    line += (prop === 'N') ? val.join(';') : val;
    vcard.push(line);
});

vcard[vcard.length] = 'VCARD:END';

console.log(vcard.join(CRLF));
console.log(dateTime());
