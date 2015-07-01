TEL-param = TEL-text-param / TEL-uri-param
TEL-value = TEL-text-value / TEL-uri-value
  ; Value and parameter MUST match.

TEL-text-param = "VALUE=text"
TEL-text-value = text

TEL-uri-param = "VALUE=uri" / mediatype-param
TEL-uri-value = URI

TEL-param =/ type-param / pid-param / pref-param / altid-param
           / any-param

type-param-tel = "text" / "voice" / "fax" / "cell" / "video"
               / "pager" / "textphone" / iana-token / x-name
  ; type-param-tel MUST NOT be used with a property other than TEL.
