const apiUrl = require('./apiUrl');
const systemInfo = wx.getSystemInfoSync()
const isIPX = !!(systemInfo && systemInfo.model.indexOf('iPhone X') !== -1)
module.exports = {
  userInfo: null, //用户信息
  mobile: '',
  account: null,
  proxIsUse: false, //是否代理
  phoneNum: '',
  cardCode:"",
  webLink:null,
  xAuthToken: null, //授权token
  unexToken:null, //
  bundleConfig: null,
  reqMax: 5, //最大请求次数
  reqCount: 0,
  managerId:'',
  tempInviteidArr:[],
  toScheduleReturnUrl:'',
  toScheduleReturnUrlType:0,//从几级页面进去的，1代表Tabar，0是其他
  userName:'',
  state: {
    binding: { getSmsCode: false }
  },
  types:['沟通协调','产品运营','策划创意','设计原画','行政人事'],


  isIPX
}