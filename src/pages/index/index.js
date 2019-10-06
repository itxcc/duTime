var app = getApp()
Page({
  data: {
    routeList:[
      {name:'沟通协调',num:'10',pram:'',url:'../../static/image/gray/post-direction1.png'},
      {name:'产品运营',num:'10',pram:'',url:'../../static/image/gray/post-direction2.png'},
      {name:'策划创意',num:'10',pram:'',url:'../../static/image/gray/post-direction3.png'},
      {name:'设计原画',num:'10',pram:'',url:'../../static/image/gray/post-direction4.png'},
      {name:'行政人事',num:'10',pram:'',url:'../../static/image/gray/post-direction5.png'},
    ]
  },
  onLoad: function () {
    this.getIndexInfo()
  },
  onShow: function(){
    this.getIndexInfo()
  },
  
  getIndexInfo:function(){
    app.promise.logined.then(res=>{
      let postData={
        "Cmd":"Login",
        "WeiXinId":app.globalData.openId
      };
      app.Request(app.apiUrl.qiyeProxy, postData).then(res => {
        wx.hideLoading();
        if(res.code=='1000'){
          if(res.data == res.data!=''){
            // let str = "经理编号,,,是否通过审核,,,马上可招人数/正在求职人数,,,我关注的马上可招人数,,,公司的粉丝数,,,新增的粉丝数,,,未读的面试邀请数,,,接收的面试邀请数,,,未读简历数,,,沟通协调数,,,产品运营数,,,策划创意数,,,设计原画数,,,行政人事数",
            let str = res.data.split(',,,')
            let indexInfo = {},routeList = this.data.routeList
                indexInfo.managerId = str[0] // 经理编号
                indexInfo.isAudit = str[1] // 是否通过审核
                app.globalData.isAudit = str[1]
                indexInfo.kezhaoOrQiuzhi = str[2] // 马上可招人数/正在求职人数
                indexInfo.focusNums = str[3] // 我关注的马上可招人数
                indexInfo.CompanyFans = str[4] // 公司的粉丝数
                indexInfo.CompanyNewFans = str[5] // 新增的粉丝数
                indexInfo.unreadInviteNums = str[6] // 未读的面试邀请数
                indexInfo.receiveInviteNums = str[7] // 接收的面试邀请数
                indexInfo.unreadResumeNums = str[8] // 未读简历数
                routeList[0].num = str[9] // 沟通协调数
                routeList[1].num = str[10] // 产品运营数
                routeList[2].num = str[11] // 策划创意数
                routeList[3].num = str[12] // 设计原画数
                routeList[4].num = str[13] // 行政人事数
                console.log(routeList)
            this.setData({
              indexInfo:indexInfo,
              routeList:routeList
            })
            console.log(str)
          }else{
            wx.showToast({
              title: '系统繁忙，请稍后再试~',
              icon: 'none',
              duration: 2000
            }) 
          }
        }else{
          wx.showToast({
            title: '系统繁忙，请稍后再试~',
            icon: 'none',
            duration: 2000
          }) 
        }
      });
    })
  },
  postMessage(){
    let postData={
      "type":4,
      "fullName":"耿志超",
      'post':'运营',
      'interviewTime':'2019-09-22',
      'stuId':100210
    };
    app.Request(app.apiUrl.message,postData).then(res => {
      wx.hideLoading()
      if(res.code=='1000'){
        if(res.data == res.data!=''){
          console.log(res.data)
        }
      }
    })
  },
  
  
  shuffleArr(array){
    var m = array.length,
        t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
  },
  toList(e){
    let  index=e.currentTarget.dataset.index+1 || 0
    app.globalData.cateindex = index
    wx.switchTab({
      url: "../list/list"
    });
  },
  toMyBox(){
    wx.navigateTo({
      url: "../my/box/box"
    })
  },
  toMyInvite(e){
    let  index=e.currentTarget.dataset.index || 0
    wx.navigateTo({
      url: "../my/invite/invite?index="+index
    })
  },
  toMyTanlent(){
    wx.navigateTo({
      url: "../my/talent/talent?index=1"
    })

  }
})
