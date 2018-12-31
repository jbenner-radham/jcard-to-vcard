Changelog
=========
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

[0.1.1] - 2019-12-31
--------------------
### Changed
- Migrated to the current [Gulp](https://gulpjs.com/) version and API usage.

### Fixed
- Generated vCards are now properly terminated with the `END:VCARD` property as
  per [RFC 6350 § 6.1.2](https://tools.ietf.org/html/rfc6350#section-6.1.2).

### Removed
- Reduced the number of project dependencies.

0.1.0 - 2017-03-05
------------------
### Added
- Initial release.

[0.1.1]: https://github.com/jbenner-radham/jcard-to-vcard/compare/v0.1.0...v0.1.1
