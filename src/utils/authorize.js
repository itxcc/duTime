module.exports = {
  getSetting (key, opt) {
    let { success, fail } = opt;
    wx.getSetting({
      success(res) {
        let isAuth = res.authSetting[`scope.${key}`];
        if (isAuth === undefined) {
          //  未授权，请求授权
          wx.authorize({
            scope: `scope.${key}`,
            success(res) { typeof success === 'function' && success(res)},
            fail(res) { typeof fail === 'function' ? fail(res) : setTimeout(_ => { wx.openSetting() }, 100) }
          })
        } else if (isAuth === false) {
          wx.openSetting()
        } else {
          typeof success === 'function' && success(res)
        }
      }
    });
  },
  getUserInfo (opt) {
    let { success, fail } = opt;
    wx.getUserInfo({
      withCredentials: true,
      success (res) { typeof success === 'function' && success(res) },
      fail (res) { typeof fail === 'function' && fail(res) }
    })
  },
  getAddress (opt) {
    let { success, fail } = opt;
    wx.getUserInfo({
      withCredentials: true,
      success (res) { typeof success === 'function' && success(res) },
      fail (res) { typeof fail === 'function' && fail(res) }
    })
  }
}