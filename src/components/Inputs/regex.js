export const emailValidation = value =>
  value && !/^\w+((\.|\+)?\w+)?@netguru(\.(co|pl))?$/.test(value) ?
  'Nice try' : undefined

export const wwwValidation = value =>
  value && /.+@aol\.com/.test(value) ?
  'Really? You still use AOL for your email?' : undefined

  export const phoneParser = value =>
    String(value)
        .replace(/[,\s]/g, '-')