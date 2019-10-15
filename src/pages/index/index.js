var app = getApp()
Page({
  data: {
    isChose:false,
    classifyName:'毒鸡汤',
    classifyId:2,
    index:1,
    articleId:6980
  },
  // onLoad: function (options) {
  //   let _this =this
  //   app.promise.logined
  //     .then(res => {
  //       console.log(options.articleId)
  //       console.log(options.classifyId)
  //       if(options.articleId!=undefined&&options.classifyId!=undefined){
  //         this.setData({
  //           articleId:options.articleId,
  //           classifyId:options.classifyId
  //         })
  //       // if(options.articleId!=''&&options.classifyId!=''){
  //         _this.getCurrentArticle()
  //       }else{
  //         _this.getArticle()
  //       }
  //       _this.getClassify()
  //     })
      
  // },
  onLoad: function (options) {
    let _this =this
    app.promise.logined
      .then(res => {
          _this.getArticle()
          _this.getClassify()
      })
      
  },
  onShow: function(){

  },
  getClassify(){
    let _this = this
    app.Request(app.apiUrl.getClassify,{},{method: 'GET',allRes: true})
      .then((res) =>{
        if(res.data.code==200){
          _this.setData({
            classify: res.data.data
          })
        }
      })  
  },
  getArticle(){
    let _this =this,
        postData = {
          "classifyId":this.data.classifyId,
          "currentPage":Math.floor(Math.random()*10+1)
        }
    app.Request(app.apiUrl.getArticle,postData,{method: 'GET',allRes: true})
    .then((res) =>{
      if(res.data.code = 200){
        _this.setData({
          contentList:_this.shuffle(res.data.data)
        })
        console.log(this.data.contentList)
      }
    })  
  },
  getCurrentArticle(){
    let _this =this,
    postData = {
      "id":this.data.articleId
    }
    app.Request(app.apiUrl.getCurrentArticle,postData,{method: 'GET',allRes: true})
    .then((res) =>{
      if(res.data.code = 200){
        _this.setData({
          content:res.data.data.content
        })
        console.log(this.data.contentList)
      }
    })  
  },
  next(){
    let contentList = this.data.contentList
        // index=this.data.index,
        // articleId = contentList[index].id
    contentList.push(contentList[0])
    contentList.splice(0,1)
    this.setData({
      contentList,
      // index:index+1,
      // articleId
    })
  },
  shuffle(arr) {
    var length = arr.length,
      randomIndex,
      temp;
    while (length) {
      randomIndex = Math.floor(Math.random() * (length--));
      temp = arr[randomIndex];
      arr[randomIndex] = arr[length];
      arr[length] = temp
    }
    return arr;
  },
  choseClassify(e){
    let id=e.currentTarget.dataset.id,
        name =e.currentTarget.dataset.name
    this.setData({
      classifyName:name,
      classifyId:id,
      isChose:!this.data.isChose
    })
    this.getArticle()
  },
  onShareAppMessage(){
    return {
      title: '世界这么假，至少在骗人的时候是真的',
      // path: '/pages/index/index?articleId='+this.data.articleId+'&classifyId='+this.data.classifyId, // 转发路径(当前页面 path )，必须是以 / 开头的完整路径
      imageUrl: '' // 图片 URL
    }
  },
  showChose(){
    this.setData({
      isChose:!this.data.isChose
    })
  },
})
