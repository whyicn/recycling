const app = getApp();
var int
// components/quizTest/quizTest.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {

  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () { 
      var that = this;
      wx:wx.request({
        url: app.globalData.url+'/recycle/totalRandomList',
        method: 'GET',
        dataType: 'json',
        success: function(res) {
          that.setData({
            titleList:res.data,
            question:res.data[0].things,
            questionType: res.data[0].type  
          })
        },
        fail: function(res) {},
        complete: function(res) {},
      })

    },
    hide: function () { 
      clearInterval(int)
    },
    resize: function () { },
  },


  /**
   * 组件的初始数据
   */
  data: {
    hour: "00",
    min: "00",
    sec: "00",
    mill: "00",
    status_star: false,
    status_pause: true,
    status_reset: true,
    totalTime:0,
    totalHit:0,
    question: 'Recycling',
    questionId: 0,
    questionType:null,
    titleList: [{
      things: null,
      type:null
    }],
    titleListTemp: [{
      things: null,
      type: null
    }],
    elements: [{
      title: '干垃圾',
      // color: '#333333',
      // backgroundImage: 'linear-gradient(45deg, #33333370, #CCCCCC50)',
    },
    {
      title: '湿垃圾',
      // color: '#663333',
      // backgroundImage: 'linear-gradient(45deg, #664C3370, #66333350);'
    },
    {
      title: '有害垃圾',
      // color: '#FF3333',
      // backgroundImage: 'linear-gradient(45deg, #FF333370, #ff993350)'
    },
    {
      title: '可回收垃圾',
      // color: '#336699',
      // backgroundImage: 'linear-gradient(45deg, #33669970, #33999950)'
    }
    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    status_pause: function () {
      console.log(3333333313)
    },
    time_s: function () {
      var that = this;
      console.log("开始计时");
      that.setData({
        status_star: true,
        status_pause: false,
        status_reset: false
      })
      var hour = this.data.hour;
      var minute = this.data.min;
      var sec = this.data.sec;
      var mill = this.data.mill;
      int = setInterval(function () {
        //逻辑
        mill++
        if (mill == 100) {
          mill = "00";
          sec++;
          //设置分钟
          if (sec > 0 && sec < 10) {
            that.setData({
              sec: "0" + sec
            })
          } else {
            that.setData({
              sec: sec
            })
          }
          if (sec == 60) {
            sec = "00";
            mill = "00";
            minute++;
            if (minute > 0 && minute < 10) {
              that.setData({
                minute: "0" + minute
              })
            } else {
              that.setData({
                minute: minute
              })
            }
            if (minute == 60) {
              minute = "00";
              sec = "00"
              mill = "00"
              hour++
              if (hour > 0 && hour < 10) {
                that.setData({
                  hour: "0" + hour
                })
              } else {
                that.setData({
                  hour: hour
                })
              }
            }
          }

        } else {
          //设置显示毫秒
          if (mill > 0 && mill < 10) {
            that.setData({
              mill: "0" + mill
            })
          } else {
            that.setData({
              mill: mill
            })
          }
        }

      }, 10)

    },
    status_pause: function () {
      this.setData({
        status_star: false,
        status_pause: true,
        status_reset: true
      })
      clearInterval(int)
    },
    status_stop: function () {
      console.log("停止计时")
      clearInterval(int)
      this.setData({
        hour: "00",
        min: "00",
        sec: "00",
        mill: "00",
        status_star: false,
        status_pause: true,
        status_reset: true
      })

    },


    answer(e){

      var that = this;
      if(this.data.question != "Recycling"){      
        // 判断是够正确
        console.log(e)
        if(e.currentTarget.dataset.item.title == this.data.questionType){          
          this.setData({
            totalHit: that.data.totalHit+1
          })
          if(!this.data.status_star){
            that.time_s()
          }
          // 判断是否在集合内
          if(this.data.questionId < this.data.titleList.length-1){
            that.setData({
              questionId: that.data.questionId+1,
              question: this.data.titleList[this.data.questionId+1].things,
              questionType: this.data.titleList[this.data.questionId+1].type
            })
            // 剩余3次时申请下一集合
            if(this.data.questionId == 6){
              wx.request({
                url: app.globalData.url+'/recycle/totalRandomList',
                method: 'GET',
                dataType: 'json',
                success: (result)=>{
                  that.setData({
                    titleListTemp:result.data,
                  })
                },
                fail: ()=>{},
                complete: ()=>{}
              });
            }
          }else{
            // 更换备用list
            that.setData({
              titleList: this.data.titleListTemp,
              questionId:0,
              questionType: this.data.titleListTemp[0].type,
              question: this.data.titleListTemp[0].things
            })
          }
        }else{
          var totalTime = (that.data.hour == 0 ? '' : that.data.hour * 3600) + (that.data.min == 0 ? '' : that.data.min * 60) + (that.data.sec == 0 ? '' : that.data.sec * 1);
          var totalHit = that.data.totalHit

          console.log("totalTime", totalTime)
          console.log("totalHit",that.data.totalHit)
          if(totalHit != 0){
            that.updateTotalHit(totalTime, totalHit)
          }         
          
          this.setData({
            totalHit: 0
          })
          if(that.data.status_star){
            that.status_stop()
          }
        }
      }
    },

  updateTotalHit(totalTime,totalHit){
    var that = this
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        console.log("openid", res.data, that.data.totalHit, )
        var openid = res.data
        wx.request({
          url: app.globalData.url + '/quiz/updateRacingData',
          data: {
            openid: openid,
            totalHit: totalHit,
            totalTime: totalTime,
            racingHit:totalHit,
            racingTime: totalTime,
            limitTime:0,
            limitHit:0
            },
          method: 'GET',
          success: function (res) {
           },
          fail: function (res) { },
          complete: function (res) { },
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }

  },
})
