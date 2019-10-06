
const validatorConfig = {
  'required': {
    required: true,
    message: '不能为空'
  },
  'requiredName': {
    required: true,
    message: '请输入收件人姓名'
  },
  'requiredTel': {
    required: true,
    message: '请输入电话号码'
  },
  'requiredAddress': {
    required: true,
    message: '请输入地址'
  },
  'max100': {
    max: 100,
    message: '不能大于100字'
  },
  'max7': {
    max: 7,
    message: '名字不能超过7个字符'
  },
  'max11': {
    max: 11,
    message: '手机号为11位'
  },
  'phone': {
    pattern: /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/,
    message: '请输入正确的手机号码'
  },
  'number': {
    type: 'number',
    message: '只能输入数字'
  },
  'email': {
    type: 'email',
    message: '请输入正确的邮箱格式'
  }
}

module.exports = validatorConfig