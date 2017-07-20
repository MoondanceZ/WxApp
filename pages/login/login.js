const openIdUrl = require('../../config').openIdUrl
var app = getApp()
Page({
  onLoad: function () {    
    if (app.globalData.hasLogin) {
      wx.redirectTo({
        url: '../index/index'
      })
    } else {
      var that = this
      app.getUserInfo(function (userInfo) {
        //更新数据
        that.setData({
          userInfo: userInfo,
          hasLogin: app.globalData.hasLogin
        })
      })
    }
  },
  data: {
    userInfo: {},
    loginText: '微信登录',
    loginInfo: '',
    isLogining: false
  },
  login: function () {
    var that = this;
    that.setData({
      isLogining: true,
      loginText: '正在登录'
    })
    wx.login({
      success: function (data) {
        if (data.code) {
          wx.request({
            url: openIdUrl,
            data: { code: data.code },
            success: function (res) {
              console.log('拉取openid成功', res)
              app.globalData.hasLogin = true
              app.globalData.openId = res.OpenId;
              that.setData({
                hasLogin: true,
                loginInfo: '登录成功'
              })
            },
            fail: function (res) {
              console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
              that.setData({
                hasLogin: true,
                loginInfo: '登录失败'
              })
              callback(res)
            }
          })
        } else {
          console.log('获取用户登录态失败：' + data.errMsg);
        }
        console.log(data);
      },
      fail: function (err) {
        console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
        callback(err)
      }
    })
  }
})
