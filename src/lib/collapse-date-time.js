'use strict';

module.exports = (dateTime) => {
    /**
     * jCard supports ISO 8601 "extended format" however vCard does not
     * so collapse any date/time types.
     *
     * @see [RFC6350], Section 4.3
     */
    return dateTime.replace(/-/g, '').replace(/:/g, '');
};
