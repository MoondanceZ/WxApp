//app.js
const openIdUrl = require('./config').loginUrl
App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 获取用户信息
    wx.getSetting({
      success: res => {
        var _self = this;
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              // 登录
              wx.login({
                success: res => {
                  console.log(res);
                  // 发送 res.code 到后台换取 openId, sessionKey, unionId
                  wx.request({
                    url: openIdUrl,
                    data: {
                      code: res.code
                    },
                    header: {
                      'content-type': 'application/json' // 默认值
                    },
                    method: "GET",
                    success: res => {
                      var result = res.data;
                      if (result.IsSuccess) {
                        _self.globalData.userId = result.Data.Id;
                        _self.globalData.token = result.Data.Token;
                      } else {
                        wx.showToast({
                          title: result.Message,
                          icon: 'none',
                          duration: 2000
                        })
                      }
                    }
                  })
                }
              })
            },
            fail() {
              wx.redirectTo({
                url: '../logs/logs'
              })
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    userId: null,
    token: null
  }
})