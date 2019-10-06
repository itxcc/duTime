module.exports = {
  ZH_CN: {
    required: '必填',
    mobile: '请输入正确的手机号码',
    max: (len) => '上限 '+ len + ' 位。',
    min: (len) => '至少 '+ len + ' 位。',
    between (range) {
      range = range.split('-');
      return '大于 ' + range[0] + ' 且小于 ' + range[1]
    },
    nospace: '含有空格',
    smsCode: '请输入6位数字验证码'
  },
  EN: {
    required: 'please required',
    mobile: 'mobile error',
    max: (len) => 'more than ' + len + ' 。',
    min: (len) => 'less tan ' + len + ' 。',
    between(range) {
      range = range.split('-');
      return 'more than ' + range[0] + ' and less than ' + range[1]
    },
    nospace: 'has space',
    smsCode: 'smsCode’s length mast 6'
  }
}