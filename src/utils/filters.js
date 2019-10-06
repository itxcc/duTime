module.exports = {
  formatePrice: function (value, f) {
    let formatter = f || ''
    if (!isNaN(value)) {
      if (value) {
        let price = value.toString(),
          mantissa = price.split('.')[1]
        if (!mantissa) {
          price += '.00'
        } else if (mantissa.length == 1) {
          price += '0'
        }
        return price
        .toString()
        .replace(/(\d)(?=(\d{3})+\.)/g, (v1, v2) => v2 + formatter)
      } else {
        return '0.00'
        .toString()
        .replace(/(\d)(?=(\d{3})+\.)/g, (v1, v2) => v2 + formatter)
      }
    } else {
      return value
    }
  },
  // 计算倒计时时间差 输入时间格式为"2018-03-12 12:12:23"
  countDownTime: function(endTime) {
    var myDate = new Date();//获取系统当前时间
    var orderDateYear = myDate.getFullYear()
    var orderDateMonth = myDate.getMonth()+1
    var orderDateDay = myDate.getDate()
    var orderDateH = myDate.getHours()
    var orderDateM = myDate.getMinutes()
    var cancelTimeYear = endTime.split(" ")[0].split("-")[0]
    var cancelTimeMonth = endTime.split(" ")[0].split("-")[1]
    var cancelTimeDay = endTime.split(" ")[0].split("-")[2]
    var cancelTimeH = endTime.split(" ")[1].split(":")[0]
    var cancelTimeM = endTime.split(" ")[1].split(":")[1]
    var year = cancelTimeYear-orderDateYear
    var month = cancelTimeMonth-orderDateMonth
    var day = cancelTimeDay-orderDateDay
    var H = cancelTimeH-orderDateH
    var M = cancelTimeM-orderDateM
    var countDownTime = ""
    if(year >0 || month > 0 || day >= 7){
      countDownTime = "7天"
    }else if(day > 0){
      countDownTime = day + "天"+ H + "小时"+ M + "分钟"
    }else{
      if(H > 1){
        if(M > 0){
          countDownTime =  H + "小时"+ M + "分钟"
        }else{
          countDownTime = (H-1) + "小时"+ (60+M) + "分钟"
        }
      }else if( H > 0){
        if(M > 0){
          countDownTime =  H + "小时"+ M + "分钟"
        }else{
          countDownTime = (60+M) + "分钟"
        }
      }else{
        countDownTime =   M + "分钟"
      }
    }
    return countDownTime
  },
  // 时间戳转换成正规的时间格式 20180314122345  -> 2018-03-14 12:12:45
  transformTime: function(timeNum, param, lang){
    lang = lang || '-';
    var year = timeNum.substring(0,4)
    var month = timeNum.substring(4,6)
    var day = timeNum.substring(6,8)
    var h = timeNum.substring(8,10)
    var m = timeNum.substring(10,12)
    var s = timeNum.substring(12,14)
    var timeString;
    switch (param) {
      case undefined: timeString = `${year}${lang}${month}${lang}${day} ${h}:${m}`; break;
      case 'yyyy': timeString = lang==='ZH_CN'? `${year}年` : `${year}`; break;
      case 'yyyy-mm': timeString = lang==='ZH_CN'? `${year}年${month}月` : `${year}${lang}${month}`; break;
      case 'mm-dd': timeString = lang==='ZH_CN'? `${month}月${day}日` : `${month}${lang}${day}`; break;
      case 'yyyy-mm-dd': timeString = lang==='ZH_CN'? `${year}年${month}月${day}日` : `${year}${lang}${month}${lang}${day}`; break;
      case 'mm-dd hh:mm': timeString = lang==='ZH_CN'? `${month}月${day}日 ${h}:${m}` : `${month}${lang}${day} ${h}:${m}`; break;
      case 'mm-dd hh:mm:ss': timeString = lang==='ZH_CN'? `${month}月${day}日 ${h}:${m}:${s}` : `${month}${lang}${day} ${h}:${m}:${s}`; break;
      case 'yyyy-mm-dd hh:mm': timeString = lang==='ZH_CN'? `${year}年${month}月${day}日 ${h}:${m}` : `${year}${lang}${month}${lang}${day} ${h}:${m}`; break;
      case 'yyyy-mm-dd hh:mm:ss': timeString = lang==='ZH_CN'? `${year}年${month}月${day}日 ${h}:${m}` : `${year}${lang}${month}${lang}${day} ${h}:${m}:${s}`; break;
      case 'hh:mm': timeString = `${h}:${m}`; break;
      case 'hh:mm:ss': timeString = `${h}:${m}:${s}`; break;
    }
    return timeString
  },
  formatTime(date, param, lang) {
    lang = lang || '-'
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    const ms = date.getMilliseconds()
    let formatNumber = this.formatNumber;
    let d = [year, month, day].map(formatNumber);
    let t = [hour, minute, second].map(formatNumber)
    let rst = ''
    switch (param) {
      case undefined: rst = (lang === 'ZH_CN' ? d[0] + '年' + d[1] + '月' + d[2] + '日' : d.join(lang)) + ' ' + t.join(':'); break;
      case 'yyyy-mm-dd hh:mm:ss.S': rst = (lang === 'ZH_CN' ? d[0] + '年' + d[1] + '月' + d[2] + '日' : d.join(lang)) + ' ' + t.join(':') + ' ' + ms; break;
      case 'yyyy-mm-dd hh:mm:ss': rst = (lang === 'ZH_CN' ? d[0] + '年' + d[1] + '月' + d[2] + '日' : d.join(lang)) + ' ' + t.join(':'); break;
      case 'yyyy-mm-dd hh:mm': rst = (lang === 'ZH_CN' ? d[0] + '年' + d[1] + '月' + d[2] + '日' : d.join(lang)) + ' ' + [t[0], t[1]].join(':');
        break;
      case 'yyyy': rst = lang === 'ZH_CN' ? d[0] + '年' : d[0]; break;
      case 'yyyy-mm': rst = lang === 'ZH_CN' ? d[0] + '年' + d[1] + '月' : [d[0], d[1]].join(lang); break;
      case 'mm-dd': rst = lang === 'ZH_CN' ? d[1] + '月' + d[2] + '日' : [d[1], d[2]].join(lang); break;
      case 'mm-dd hh:mm': rst = (lang === 'ZH_CN' ? d[1] + '月' + d[2] + '日' : [d[1], d[2]].join(lang)) + ' ' + [t[0], t[1]].join(':'); break;
      case 'yyyy-mm-dd': rst = lang === 'ZH_CN' ? d[0] + '年' + d[1] + '月' + d[2] + '日' : d.join(lang); break;
      case 'hh:mm': rst = [t[0], t[1]].join(':'); break;
      case 'hh:mm:ss': rst = t.join(':'); break;
    }
    return rst
  },
  formatNumber(n) { return n < 10 ? '0' + n : n },
}