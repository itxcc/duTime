module.exports = {
  formatTime (date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
  
    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')},

  formatNumber (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  },
  
  getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
  },
  timestampToTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = date.getDate() + ' ';
    var h = (date.getHours()<10?"0"+date.getHours():date.getHours()) + ':';
    var m = (date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes())+ ':';
    var s = date.getSeconds()<10?"0"+date.getSeconds():date.getSeconds();
    return Y+M+D+h+m+s;
  },

  objToArr (obj, name) {
    let arr = [];
    for (let k in obj) {
      if (name) obj[k][name] = k;
      arr.push(obj[k])
    }
    return arr;
  },
  arrToObj (arr, key) {
    let obj = {};
    arr.forEach(_itm => { obj[_itm[key]] = _itm; })
    return obj;
  },
  createQueryList(obj) {
    if (!obj) { return "" }
    let arr = []
    for (let k in obj) {
      if (obj[k]) arr.push(k + '=' + obj[k])
    }
    return arr;
  },
  createQueryString(obj) {
    let arr = this.createQueryList(obj);
    return arr.length ? "?" + arr.join("&") : "";
  },
  // 封装倒计时方法
  setCounting (page,key, model, count=60) {
    page.setData({[`${key}.text`]: `${count}s` ,[`${key}.active`]: true})
    let timer = setInterval(_=>{
      if (count === 0) { clearInterval(timer); page.setData({ [`${key}.text`]: model.placeholder, [`${key}.active`]: false }); }
      else { count--; page.setData({[`${key}.text`]: `${count}s`});}
    }, 1000);
    return timer;
  },
  showToast:function(msg){
      wx.showToast({
        title: msg,
        icon: 'none',
        mask:true,
        duration: 2000
      })
  },
  // 判断两个对象键值对是否相同
  isEqualObject(a, b) {
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);
    // console.log('Props Value', aProps.length != bProps.length);
    if (aProps.length != bProps.length) { return false; }
    for (var i = 0; i < aProps.length; i++) {
      var propName = aProps[i];
      if (a[propName] !== b[propName]) {
        return false;
        break;
      }
    }
    return true;
  }
}
