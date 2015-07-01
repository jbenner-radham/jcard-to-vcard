# jcard-to-vcard

## Heads Up!

This is still very much a WIP project.

## Usage

```sh
node dist/cli.js my-jcard.json > my-new-vcard.vcf
```

## To-do

- [x] `BEGIN` property parsing
- [x] `END` property parsing
- [ ] `SOURCE` property parsing
- [ ] `KIND` property parsing
- [ ] `XML` property parsing
- [x] `FN` property parsing
- [x] `N` property parsing
- [ ] `NICKNAME` property parsing
- [ ] `PHOTO` property parsing
- [x] `BDAY` property parsing
- [ ] `ANNIVERSARY` property parsing
- [ ] `GENDER` property parsing
- [x] `ADR` property parsing
- [x] `TEL` property parsing
- [x] `EMAIL` property parsing
- [ ] `IMPP` property parsing
- [x] `LANG` property parsing
- [x] `TZ` property parsing
- [ ] `GEO` property parsing
- [ ] `TITLE` property parsing
- [ ] `ROLE` property parsing
- [ ] `LOGO` property parsing
- [ ] `ORG` property parsing
- [ ] `MEMBER` property parsing
- [x] `RELATED` property parsing
- [ ] `CATEGORIES` property parsing
- [ ] `NOTE` property parsing
- [ ] `PRODID` property parsing
- [x] `REV` property parsing
- [ ] `SOUND` property parsing
- [ ] `UID` property parsing
- [ ] `CLIENTPIDMAP` property parsing
- [ ] `URL` property parsing
- [x] `VERSION` property parsing
- [ ] `KEY` property parsing
- [ ] `FBURL` property parsing
- [ ] `CALADRURI` property parsing
- [ ] `CALURI` property parsing

## Reference

- http://tools.ietf.org/html/rfc6350
- http://tools.ietf.org/html/rfc7095
