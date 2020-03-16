const app = getApp();
var that = this
// components/quizComponents/quizTop/quizTop.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  pageLifetimes:{
    show: function () {
      var that = this
      wx: wx.getStorage({
        key: 'openid',
        success: function (res) {
          that.setData({
            openid: res.data
          })
        },
        fail: function (res) { },
        complete: function (res) { },
      })

// 获取racingToplist

      wx:wx.request({
        
        url: app.globalData.url +'/quiz/racingTopList',
        method: 'GET',
        dataType: 'json',
        success: function(res) {

          console.log(that.data.triggered)
          var Result = [];            
          for(var index in res.data){
            if (res.data[index].racingTime < 60) {
              var itemRacingTime = res.data[index].racingTime + 's';
            } else if (60 < res.data[index].racingTime && res.data[index].racingTime  < 3600) {
              var itemRacingTime = Math.floor(res.data[index].racingTime / 60) + 'm' + res.data[index].racingTime % 60 + 's';
            } else if (res.data[index].racingTime > 3600){
              var itemRacingTime = Math.floor(res.data[index].racingTime / 3600) + 'h' + Math.floor(res.data[index].racingTime % 3600 / 60) + 'm'
            } 

            var itemRacingHit = res.data[index].racingHit;
            var itemNickName = res.data[index].user.nickName;
            var itemAvatarUrl = res.data[index].user.avatarUrl;
            var itemOpenid = res.data[index].openid

            var racingTime = "racingTop[" + index + "].racingTime";
            var racingHit = "racingTop[" + index + "].racingHit";
            var nickName = "racingTop[" + index + "].nickName";
            var avatarUrl = "racingTop[" + index + "].avatarUrl";
            var openid = "racingTop["+index+"].openid"
            var racingColor = "racingTop[" + index + "].openid"

              Result.push({
                "racingTime": itemRacingTime,
                "racingHit": itemRacingHit,
                "nickName": itemNickName,
                "avatarUrl": itemAvatarUrl,
                "openid": itemOpenid,
                "racingColor": (itemOpenid == that.data.openid ? 'racingColor' : '')
              })
            
          }
        
          that.setData({
            Tohidden: false,
            racingTop: Result
          })
          
        },
        fail: function(res) {},
        complete: function(res) {},
      })

// 获取limitTopList

      wx: wx.request({
        url: app.globalData.url + '/quiz/limitTopList',
        method: 'GET',
        dataType: 'json',
        success: function (res) {
          var Result = [];
          for (var index in res.data) {

            if (res.data[index].limitTime < 60) {
              var itemLimitTime = res.data[index].limitTime + 's';
            } else if (60 < res.data[index].limitTime && res.data[index].limitTime < 3600) {
              var itemLimitTime = Math.floor(res.data[index].limitTime / 60) + 'm' + res.data[index].limitTime % 60 + 's';
            } else if (res.data[index].limitTime > 3600) {
              var itemLimitTime = Math.floor(res.data[index].limitTime / 3600) + 'h' + Math.floor(res.data[index].limitTime % 3600 / 60) + 'm'
            }
            
            var itemLimitHit = res.data[index].limitHit;
            var itemNickName = res.data[index].user.nickName;
            var itemAvatarUrl = res.data[index].user.avatarUrl;
            var itemOpenid = res.data[index].openid

            var limitTime = "racingTop[" + index + "].limitTime";
            var limitHit = "racingTop[" + index + "].limitHit";
            var nickName = "racingTop[" + index + "].nickName";
            console.log(nickName)
            var avatarUrl = "racingTop[" + index + "].avatarUrl";
            var openid = "racingTop[" + index + "].openid"
            var limitColor = "racingTop[" + index + "].openid"

            Result.push({
              "limitTime": itemLimitTime,
              "limitHit": itemLimitHit,
              "nickName": itemNickName,
              "avatarUrl": itemAvatarUrl,
              "openid": itemOpenid,
              "limitColor": (itemOpenid == that.data.openid ? 'limitColor' : '')
            })

          }
          that.setData({
            Tohidden: false,
            timeLimitTop: Result
          })
        },

        fail: function (res) { },
        complete: function (res) { },
      })


    },
    hide: function () {
      // 页面被隐藏
      console.log("页面被隐藏")
    },
    resize: function (size) {
      // 页面尺寸变化
      console.log("页面尺寸变化")
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    openid:null,
    arr: [],
    triggered: false,
    racingTop:[][{
      racingTime:'',
      racingHit:'',
      nickName:'',
      avatarUrl:'',
      openid:'',
      racingColor:'',
    }],
    timeLimitTop:[][{
      limitTime: '',
      limitHit: '',
      nickName: '',
      avatarUrl: '',
      openid: '',
      limitColor: '',
    }]
  },
  onReady: function () {
    var that = this;
    const arr = []
    for (let i = 0; i < 100; i++) arr.push(i)
    this.setData({
      arr
    })

    setTimeout(() => {
      this.setData({
        triggered: true,
      })
    }, 1000)
  },

  onPulling(e) {
    console.log('onPulling:', e)
  },

  onRefresh() {
    if (this._freshing) return
    this._freshing = true
    setTimeout(() => {
      this.setData({
        triggered: false,
      })
      this._freshing = false
    }, 3000)
  },

  onRestore(e) {
    console.log('onRestore:', e)
  },

  onAbort(e) {
    console.log('onAbort', e)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onReady: function () {

      const arr = []
      for (let i = 0; i < 100; i++) arr.push(i)
      this.setData({
        arr
      })

      setTimeout(() => {
        this.setData({
          triggered: true,
        })
      }, 1000)
    },

    onPulling(e) {
      console.log('onPulling:', e)
    },

    onRefresh() {
      if (this._freshing) return
      this._freshing = true
      setTimeout(() => {
        this.setData({
          triggered: false,
        })
        this._freshing = false
      }, 3000)
    },

    onRestore(e) {
      console.log('onRestore:', e)
    },

    onAbort(e) {
      console.log('onAbort', e)
    },
  }
})
