module.exports = {
  reg: {
    mobile: /^[1][3,4,5,7,8][0-9]{9}$/,
    smsCode: /^\d{6}$/,
    nospace: /\s/g
  },
  required: (val) => val.trim() !== '',
  max: (val, len) => val.trim().length <= len,
  min: (val, len) => val.trim().length >= len,
  between (val, range) {
    range = range.split('-');
    let len = val.trim().length;
    return len >= range[0] && len <= range[1]
  },
  nospace(val) { return !(val.trim().indexOf(' ') > -1) },
  mobile(val) { return this.reg.mobile.test(val) },
  smsCode (val) { return this.req.smsCode.test(val) }
}