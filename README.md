# jcard-to-vcard

A jCard to vCard converter. Currently CLI only but will have a programmatic
module interface in the future.

## Heads Up!

This is still very much a WIP project.

## Usage

```sh
node dist/cli.js my-jcard.json > my-new-vcard.vcf
```

## To-do

- [x] `ADR` property parsing
- [x] `ANNIVERSARY` property parsing
- [x] `BDAY` property parsing
- [x] `BEGIN` property parsing
- [x] `CALADRURI` property parsing
- [x] `CALURI` property parsing
- [x] `CATEGORIES` property parsing
- [ ] `CLIENTPIDMAP` property parsing
- [x] `EMAIL` property parsing
- [x] `END` property parsing
- [ ] `FBURL` property parsing
- [x] `FN` property parsing
- [x] `GENDER` property parsing
- [ ] `GEO` property parsing
- [x] `IMPP` property parsing
- [x] `KEY` property parsing
- [x] `KIND` property parsing
- [x] `LANG` property parsing
- [ ] `LOGO` property parsing
- [ ] `MEMBER` property parsing
- [x] `N` property parsing
- [x] `NICKNAME` property parsing
- [x] `NOTE` property parsing
- [x] `ORG` property parsing
- [ ] `PHOTO` property parsing
- [x] `PRODID` property parsing
- [x] `RELATED` property parsing
- [x] `REV` property parsing
- [x] `ROLE` property parsing
- [ ] `SOUND` property parsing
- [ ] `SOURCE` property parsing
- [x] `TEL` property parsing
- [x] `TITLE` property parsing
- [x] `TZ` property parsing
- [ ] `UID` property parsing
- [ ] `URL` property parsing
- [ ] `VERSION` property parsing
- [ ] `XML` property parsing
- [ ] `MEDIATYPE` parameter parsing
- [ ] `PID` parameter parsing
- [ ] `PREF` parameter parsing
- [ ] `TYPE` parameter parsing
- [ ] `VALUE` parameter parsing

## Reference

- [Augmented BNF for Syntax Specifications: ABNF](http://tools.ietf.org/html/rfc5234)
- [vCard Format Specification](http://tools.ietf.org/html/rfc6350)
- [Parameter Value Encoding in iCalendar and vCard](http://tools.ietf.org/html/rfc6868)
- [jCard: The JSON Format for vCard](http://tools.ietf.org/html/rfc7095)
