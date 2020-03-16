const app = getApp();

Page({


  options: {
    addGlobalClass: true,
  },
  data: {
    userInfo: {},
    hasUserInfo: false,
    motto: 'Hello World',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    openid:'',
    sessionKey:'',
    totalHit: 0,
    everageTime: 0,
    racingHit: 0,
    limitHit:0,
    startTotalHit: 0,
    startEverageTime: 0,
    startRacingHit: 0,
    startLimitHit:0,
    user: [{
      nickName: null,
      gender: null,
      language: null,
      city: null,
      province: null,
      country: null,
      avatarUrl: null,
      openid: null,
      sessionKey: null,
    }]
  },
  attached() {
    console.log("success")
    let that = this;
    wx.showLoading({
      title: '数据加载中',
      mask: true,
    })
    let i = 0;
    numDH();

    function numDH() {
      if (i < 20) {
        setTimeout(function() {
          that.setData({
            startTotalHit: i,
            startRacingHit: i,
            startLimitHit:i,
          })
          i++
          numDH();
        }, 20)
      } else {
        that.setData({
          startTotalHit: that.coutNum(that.data.totalHit),
          startRacingHit: that.coutNum(that.data.racingHit),
          startLimitHit:that.coutNum(that.data.limitHit)
        })
      }
    }
    wx.hideLoading()
  },

  onLoad: function() {
    var that = this;
    wx.getStorage({
      key: 'openid',
      success: (result) => {
        that.setData({
          openid:result.data
        })

        wx.request({
          url: app.globalData.url+'/quiz/findById',
          data: {
            openid: that.data.openid
          },

          method: 'GET',
          dataType: 'json',
          responseType: 'text',
          success: (result) => {
            var average = result.data[0].totalHit/result.data[0].totalTime
            average = average.toFixed(2)
            console.log(average)
            that.setData({
              totalHit:result.data[0].totalHit,
              racingHit:result.data[0].racingHit,
              limitHit:result.data[0].limitHit,
              everageTime: average
            })
          },
          fail: () => {},
          complete: () => {}
        });
          

      },
      fail: () => {},
      complete: () => {}
    });
      
    that.attached()

    
    if (app.globalData.userInfo) {
      
      console.log("这个是全局信息",app.globalData.userInfo)
      
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          console.log("登陆成功打印信息",res);
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        },
        fail: res=>{
          console.log("获取信息失败")
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    var that = this
    app.globalData.iv = e.detail.iv
    app.globalData.encryptedData = e.detail.encryptedData
    app.globalData.userInfo = e.detail.userInfo
    console.log(e.detail.encryptedData, e.detail.userInfo)
    this.setData({
      encryptedData: e.detail.encryptedData,
      iv: e.detail.iv,
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    wx.login({
      success: function(res) {

        console.log("result code --->", res.code);
        var codes = res.code;
        // 返回 JS_code
        wx.request({
          // 请求目标网址获取sessionKey和openid
          url: 'http://47.95.241.182:5000/SessionkeyAndOpenid',
          data: {
            js_code: codes,
          },
          header: {
            'content-type': 'application/json'
          },
          method: 'GET',
          dataType: 'json',
          responseType: 'text',
          success: (result) => {
          console.log("获取到的seesionkey和openid", result)
            that.setData({
              openid: result.data.openid,
              sessionKey: result.data.session_key
            })
            console.log(result.data.openid);
            
            wx.getUserInfo({
              withCredentials: 'false',
              lang: 'zh_CN',
              timeout: 10000,
              success: (result) => {
                console.log(that.data.userInfo)
                var user = that.data.userInfo
                that.setData({
                  user:{
                    nickName:user.nickName,
                    gender:user.gender,
                    language: user.language,
                    city: user.city,
                    province: user.province,
                    country: user.country,
                    avatarUrl: user.avatarUrl,
                    openid: that.data.openid,
                    sessionKey: that.data.sessionKey
                  }
                })
                wx.setStorageSync("openid", that.data.openid)
              },
              complete: () => {
                wx.request({
                  url: app.globalData.url + "/user/saveUser",
                  data: that.data.user,
                  method: 'get',
                  dataType: 'json',
                  success: function (res) {
                    console.log("helelllelelel")
                  },
                  fail: function (res) { console.log(res) },
                  complete: function (res) { console.log("helelllelelel")},
                })
              }
            });

          },
          fail: () => {},
          complete: () => {}
        });
      },
      fail: function(res) {
        console.log(res)
      },
      complete: function(res) {
        console.log(res)
      },
    })
  },



  coutNum(e) {
    console.log(e)
    if (e > 1000 && e < 10000) {
      e = (e / 1000).toFixed(1) + 'k'
    }
    if (e > 10000) {
      e = (e / 10000).toFixed(1) + 'W'
    }
    return e
  },
  CopyLink(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.link,
      success: res => {
        wx.showToast({
          title: '已复制',
          duration: 1000,
        })
      }
    })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  showQrcode() {
    wx.previewImage({
      urls: ['https://ae01.alicdn.com/kf/Hc1755e342d88441a80a6a56ac379d6bdv.png'],
      current: 'https://ae01.alicdn.com/kf/Hc1755e342d88441a80a6a56ac379d6bdv.png' // 当前显示图片的http链接      
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})