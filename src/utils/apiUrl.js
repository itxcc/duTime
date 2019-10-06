var api = {
  NODE_ENV: '"Uat development"',
  ENV_TAG: 'Uat development',
  BASEURL: 'https://www.deltablue.cn',
}
module.exports = {
  //接口列表开始
  baseurl:'http://www.deltablue.cn',
  sms:{
    send:`${api.BASEURL}/sms/send`,
    verify:`${api.BASEURL}/sms/verify`
  },

  qiyeLogin:`${api.BASEURL}/qiye/login/`,
  qiyeProxy:`${api.BASEURL}/qiye/proxy`,
  email:{
    sendCode:`${api.BASEURL}/mail/simple/sendCode`, //发送邮件验证码
    checkCode:`${api.BASEURL}/mail/simple/checkCode`, //校验邮件验证码
    send:`${api.BASEURL}/mail/attachment/send`, //发送附件邮件接口
  },
  upload:{
    license:`${api.BASEURL}/qiye/file/license/uploud`, //上传营业执照接口
    files:`${api.BASEURL}/qiye/file/common/uploud`,//上传其他信息接口
  },
  message:`${api.BASEURL}/message/common/eventCreate`,

  location:`${api.BASEURL}/location/getLocation`

}