var app = getApp()
Page({
  onLoad: function () {
    var that = this
    that.setData({
      hasLogin: app.globalData.hasLogin
    })
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  data: {
    userInfo: {}
  },
  login: function () {
    var that = this
    wx.login({
      success: function (res) {
        app.globalData.hasLogin = true
        that.setData({
          hasLogin: true
        })
        that.update()
        var code = res.code;
        if (code) {
          console.log('获取用户登录凭证：' + code);
        } else {
          console.log('获取用户登录态失败：' + res.errMsg);
        }
        console.log(res);
      }
    })
  }
})
