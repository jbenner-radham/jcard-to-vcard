'use strict';

var dateTime = require('date-time');
var sprintf = require('sprintf-js').sprintf;

function pp(context) {
   console.log(JSON.stringify(context, null, 4));
}

// "address"
var adr = {
    postOfficeBox: '',
    // (e.g., apartment or suite number)
    extendedAddress: '',
    streetAddress: '',
    // (e.g., city)
    locality: '',
    // (e.g., state or province)
    region: '',
    postalCode: '',
    // (full name in the language specified in [RFC6350]Section 5.1)
    countryName: ''
};

var structuredProperty = {};
var textProperty = { parameters: {}, type: 'text', value: '' };

var metacard = {
    version: {
        parameters: {},
        type: 'text',
        value: '4.0'
    },
    // "formatted name"
    fn: {
        parameters: {},
        type: 'text',
        value: ''
    }
};

// "name" | [LDAP/LDIF] "cn"
var n = {
    parameters: {},
    type: 'text',
    value: {
        // a.k.a. "surname" | [LDIF] "sn"
        familyName: '',
        // [LDIF] "givenname"
        givenName: '',
        additionalNames: '',
        honorificPrefixes: '',
        honorificSuffixes: ''
    }
};

// [LDIF] "objectclass"
var kind = {};

var fn = 'YOLO McYOLO';
var jcard = require('./data/template-minimum.jcard.json');
pp(jcard);
console.log('----');
jcard[1][1].push(fn);
pp(jcard);
console.log('----');
//var now = Date.now();
//var now = moment().toISOString();
//var now = moment().format('YYYY-MM-DD T HH:mm:ss Z');
var t = new Date();
console.log(new Date().toISOString());
//console.log(sprintf('%04d-%02d-%02dT%02d:%02d:%02dZ', t.getUTCFullYear(), t.getUTCMonth() + 1, t.getUTCDate(), t.getUTCHours(), t.getUTCMinutes(), t.getUTCSeconds()));

var now = new Date();

var t = {
    year:   now.getUTCFullYear(),
    month:  now.getUTCMonth() + 1,
    day:    now.getUTCDate(),
    hour:   now.getUTCHours(),
    minute: now.getUTCMinutes(),
    second: now.getUTCSeconds()
};

/*
var timestamp = sprintf(
    [
        '%(t.year)04d', '%(t.month)02d', '%(t.day)02d'
    ].join('-') + 'T' +
    [
        '%(t.hour)02d', '%(t.minute)02d', '%(t.second)02d'
    ].join(':') + 'Z',
    {t: t}
);
*/

var rev = {
    parameters: {},
    type: 'timestamp',
    value: ''
};

// ISO 8601:2004(E) - Date and time; 4.3.2 Complete representations (extended format)
// `YYYY-MM-DDThh:mm:ssZ`
var timestamp = sprintf('%(t.year)04d-%(t.month)02d-%(t.day)02dT%(t.hour)02d:%(t.minute)02d:%(t.second)02dZ', {t: t});
console.log(timestamp);
console.log(dateTime());
console.log('----');
rev.value = timestamp;
pp(rev);
/**
   [ISO.8601.2004]
       International Organization for Standardization, "Data
       elements and interchange formats -- Information
       interchange -- Representation of dates and times", ISO
       8601, December 2004.
 */
