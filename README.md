jcard-to-vcard
==============
[![npm Version][NPM VERSION BADGE]][NPM PAGE]
[![GitHub License][LICENSE BADGE]][LICENSE PAGE]
[![Build Status][BUILD BADGE]][BUILD PAGE]

A jCard to vCard converter. Currently CLI only but will have a programmatic
module interface in the future.

## Heads Up!

This is still very much a WIP project and is __*not*__ feature complete.

## Usage

```sh
$ node cli.js jcard.json > vcard.vcf
```

## To-Do

- [ ] Property Parsing
  - [x] `ADR`
  - [x] `ANNIVERSARY`
  - [x] `BDAY`
  - [x] `BEGIN`
  - [x] `CALADRURI`
  - [x] `CALURI`
  - [x] `CATEGORIES`
  - [ ] `CLIENTPIDMAP`
  - [x] `EMAIL`
  - [x] `END`
  - [ ] `FBURL`
  - [x] `FN`
  - [x] `GENDER`
  - [ ] `GEO`
  - [x] `IMPP`
  - [x] `KEY`
  - [x] `KIND`
  - [x] `LANG`
  - [ ] `LOGO`
  - [ ] `MEMBER`
  - [x] `N`
  - [x] `NICKNAME`
  - [x] `NOTE`
  - [x] `ORG`
  - [x] `PHOTO`
  - [x] `PRODID`
  - [x] `RELATED`
  - [x] `REV`
  - [x] `ROLE`
  - [ ] `SOUND`
  - [x] `SOURCE`
  - [x] `TEL`
  - [x] `TITLE`
  - [x] `TZ`
  - [ ] `UID`
  - [x] `URL`
  - [ ] `VERSION`
  - [ ] `XML`
- [ ] Parameter Parsing
  - [ ] `ALTID`
  - [ ] `CALSCALE`
  - [ ] `GEO`
  - [ ] `LANGUAGE`
  - [ ] `MEDIATYPE`
  - [ ] `PID`
  - [ ] `PREF`
  - [ ] `SORT-AS`
  - [ ] `TYPE`
  - [ ] `TZ`
  - [ ] `VALUE`

## Reference

- [Augmented BNF for Syntax Specifications: ABNF](http://tools.ietf.org/html/rfc5234)
- [vCard Format Specification](http://tools.ietf.org/html/rfc6350)
  - [Errata](http://www.rfc-editor.org/errata_search.php?rfc=6350)
- [Parameter Value Encoding in iCalendar and vCard](http://tools.ietf.org/html/rfc6868)
- [jCard: The JSON Format for vCard](http://tools.ietf.org/html/rfc7095)
- [vCard Elements (IANA Protocol Registry)](http://www.iana.org/assignments/vcard-elements/vcard-elements.xhtml)

## License

This project is licensed under the terms of the [MIT License (Expat)](https://tldrlegal.com/l/mit). You can view the full license [here](README.md).

[BUILD BADGE]: https://img.shields.io/travis/jbenner-radham/jcard-to-vcard.svg?style=flat-square
[BUILD PAGE]: https://travis-ci.org/jbenner-radham/jcard-to-vcard
[LICENSE BADGE]: https://img.shields.io/badge/license-MIT%20License-blue.svg?style=flat-square
[LICENSE PAGE]: https://github.com/jbenner-radham/jcard-to-vcard/blob/master/LICENSE
[NPM PAGE]: https://www.npmjs.com/package/jcard-to-vcard
[NPM VERSION BADGE]: https://img.shields.io/npm/v/jcard-to-vcard.svg?style=flat-square
