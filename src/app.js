//app.js
const apiUrl = require('/utils/apiUrl.js'); // 接口列表
const globalData = require('/utils/globalData.js');
const filters = require('/utils/filters.js');
const apiFilters = require('/utils/apiFilters.js');
const authorize = require('/utils/authorize.js');
App({
  globalData: {},
  promise: {},
  apiUrl: {},
  filters: {},
  apiFilters: {},
  commonTimer: {},
  authorize: {},
  isIPX: {},
  renderTime: 1000,
  myUtil: require('/utils/util.js'),
  myValidate: require('./utils/form/myValidate.js'),
  validDec: require('./utils/form/validDec.js'),
  onLaunch: function (options) {
    // 初始化2
    this.init();
  },
  login: function () {
    var that = this;
    return new Promise(function (resolve, reject) {
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey
          that.Request(apiUrl.getUserToken,
            {code:res.code},
            {method: 'GET',allRes: true}
          )
          .then(success, fail)
          function success(res) {
            if (res.data.code == 200) {
              console.log(res.data.data)
              that.globalData.openId=res.data.data.openid?res.data.data.openid:''
              wx.setStorageSync('openId', res.data.data.openid?res.data.data.openid:'')  
              resolve(res.data.data)
            } else {
              fail(res)
            }
          }
          function fail(res) {
            reject(res);
          }
          
        }
      })
    })
  },
  init: function () {
    Object.assign(this.apiUrl, apiUrl);
    Object.assign(this.globalData, globalData);
    Object.assign(this.filters, filters);
    Object.assign(this.apiFilters, apiFilters);
    Object.assign(this.authorize, authorize);
  },
  onShow: function () {
    
    this.promise.logined = this.login();
  },
  // 封装Request
  Request: function (url, data, option, transHeader) {
    // { poxIsUse: '是否加入代理', method: '请求的方式', allRes: '是否显示所有的返回', poxUrl: '代理接口' }
    console.log('url------->',url);
    console.log('data入参------->',data);
    let that = this,
      opt = {
        poxIsUse: false,
        method: 'POST',
        allRes: false,
        poxUrl: that.apiUrl.poxUrl
      };
    Object.assign(opt, option);
    let {
      xAuthToken,
      reqMax
    } = that.globalData, header = {};
    if (xAuthToken) {
      Object.assign(header, {
        'x-Auth-Token': xAuthToken
      })
    }
    // Object.assign(header, {
    //     'x-Auth-Token': "bdcb7f9e-cee3-4f19-a7d4-c80ea6995726"
    //   })
    Object.assign(header, transHeader);
    let _promise = new Promise(function (resolve, reject) {
      let reqCount = 0;
      wx.showNavigationBarLoading();
      let complete = function () {
        wx.hideNavigationBarLoading()
      }; // 调用成功、失败都会执行
      // 去掉微信的封装,直接返回服务器的结果
      let success = function (res) {
        console.log(res)
       //当调用授权接口的时候，获取响应头中的 授权token。赋值给全局对象上
       
       if (res.statusCode == 200 && res.errMsg == "request:ok") {
        console.log('response-------->', res)
        resolve(opt.allRes ? res : res.data);
        }else if (res.data.code != "200" || res.data.code != 200 ) {
          that.globalData.reqCount+=1
          if(that.globalData.reqCount<=reqMax) {
            that.promise.logined = that.login();
            setTimeout(_=>{
              that.promise.logined.then(res=>{
                that.Request(url, data, option, transHeader).then(_res=>{
                  resolve(_res); that.globalData.reqCount = 0;})
              })
            },1000)

            } else {      
              wx.showToast({
                title: '登陆失败，请重新打开小程序再试',
                icon: 'none',
                duration: 2000
              }) 
            }
        }else {
         reject(opt.allRes ? res : res.errMsg);
       }
      };
      let requeturl = "",
        requestdata = {}; 
      // 设置代理地址
      if (opt.poxIsUse) {
        requeturl = opt.poxUrl;
        requestdata = {
          url,
          map: data
        };
      } else {
        requeturl = url;
        requestdata = data;
      }
      var args = {
        url: requeturl,
        method: opt.method,
        header,
        data: requestdata,
        success,
        fail: reject,
        complete
      }; // 设置请求参数
      wx.request(args); // 发起请求
    });
    return _promise;
  },
  requestError(err) {
    console.log(err);
    this.toastMsg('系统繁忙，请稍后再试！');
  },
  toastMsg(title, image, icon = 'none', duration = 2000) {
    wx.showToast({
      title,
      icon,
      mask:true,
      image: !!image ? image : '',
      duration
    });
  },
  getUserInfo(){
    this.Request(this.apiUrl.userProfile, {
      managerId: this.globalData.managerId
    }).then(res => {
        wx.hideLoading();
        if (res.code == 1000) {
          this.globalData.userName=res.data.stuInfoDto.name
        }
      })
  }
})