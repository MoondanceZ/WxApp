//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
     ConsumeRecord: [{
      Date: "7月19日",
      Type: 1,
      Amount: 1001,
      Info: "吃饭"
    }, {
      Date: "7月19日",
      Type: 1,
      Amount: 1001,
      Info: "吃饭"
    }, {
      Date: "7月11日",
      Type: 1,
      Amount: 1001,
      Info: "吃饭"
    }, {
      Date: "7月12日",
      Type: 1,
      Amount: 1001,
      Info: "吃饭"
    }, {
      Date: "7月13日",
      Type: 1,
      Amount: 1001,
      Info: "吃饭"
    },{
      Date: "7月13日",
      Type: 2,
      Amount: 5001,
      Info: "工资"
    }],
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
