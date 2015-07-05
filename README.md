# jcard-to-vcard

> A jCard to vCard converter. Currently CLI only but will have a programmatic
module interface in the future.

## Heads Up!

This is still very much a WIP project and is __*not*__ production ready.

## Usage

```sh
$ node dist/cli.js my-jcard.json > my-new-vcard.vcf
```

## To-do

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
  - [ ] `URL`
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

This project is licensed under the terms of the [MIT License](https://www.tldrlegal.com/l/mit). You can view the full license [here](README.md)
