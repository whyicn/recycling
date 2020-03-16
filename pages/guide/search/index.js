const app = getApp();
var int
var out
// pages/guide/search/index.js
Page({
  

  /**
   * 页面的初始数据
   */
  data: {

      tempResult:null,
      ColorList: app.globalData.ColorList,
      Tohidden:true,
      openid:null,
      ResultList:[][
        {
          "id":null,
          "thingsBefore":null,
          "things": null,
          "thingsAfter": null,
          "type":null
        }
      ],
    PeopleSearch: [
      {
        "searchWord": '',
        "id":null
      }
    ],
    SelfSearch: [
      {
        "searchWord":'',
        "id": null
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    wx:wx.request({
      url: app.globalData.url +'/topSearch/peopleSearch',
      method: 'GET',
      dataType: 'json',
      success: function(res) {
        that.setData({
          PeopleSearch: res.data
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
 
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({
          openid: res.data
        })
        wx: wx.request({
          url: app.globalData.url + '/topSearch/selfSearch',
          data:{
            openid:that.data.openid
          },
          method: 'GET',
          dataType: 'json',
          success: function (res) {
            that.setData({
              SelfSearch:res.data
            })
          },
          fail: function (res) { console.log("+",res) },
          complete: function (res) { },
        })
      },
    })  


    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  
  BackPage(e) {
    console.log(e);
    if (!this.data.Tohidden){
      this.setData({
        Tohidden: true,
        ResultList: null,
        SearchWord:null
      })
    }else{
      wx.navigateBack({
        delta: 1
      });
    }
    
  },
  clickHotWord(e){
    var that = this;
    that.searching(e.currentTarget.dataset.item.searchWord)
  },
  plainSearch(e){
    var that = this;
    that.searching(e.detail.value)
  },

  saveSearch(searchWord){
    var that = this;
    wx:wx.request({
      url: app.globalData.url+'/topSearch/saveSearch',
      data: {
        openid: that.data.openid,
        searchWord: searchWord
      },
      method: 'GET',
      dataType: 'json',
      success: function(res) {console.log},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  searching(searchwords){
    var that = this;
    var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g")
    if (reg.test(searchwords) && searchwords) {
      this.setData({
        searchWord: searchwords
      })
 
      wx.request({
        url: app.globalData.url+'/recycle/blurSearch',
        data: {
          searchWord: searchwords,
        },
        method: 'get',
        dataType: 'json',
        success: (result) => {
          clearTimeout(out)
          clearInterval(int)
          if (result.data != []){
            
            out = setTimeout(function() {
              that.setData({
                tempResult:searchwords
              })
            }, 2000);

            out = setTimeout(function() {
              clearInterval(int)
              console.log(that.data.tempResult+'====')
              console.log(searchwords+'=+++')
              console.log(that.data.tempResult == searchwords)
            }, 4000);

  
            int = setInterval(function() {
              console.log(that.data.tempResult == searchwords)
              if(that.data.tempResult == searchwords && that.data.tempResult!=null){
                that.saveSearch(that.data.tempResult)
                clearInterval(int)
              }
            }, 100);
  
          
            

          // 处理结果 使结果关键字高亮显示
          var resultData = result.data;
          var Result = [{}];
          for(var index in resultData){
            var item = resultData[index].things;
            var itemtype = resultData[index].type;
            var itemid = resultData[index].id;

            var strLength = item.length;
            var keyIndex = item.indexOf(this.data.searchWord);
            var keyLenghth = this.data.searchWord.length;
            
            if (keyIndex==0){
              var startStr = '';
            } else { startStr = item.slice(0, keyIndex);}
            if ((keyLenghth+keyIndex) >= strLength){
              var endStr = '';
            }else{endStr = item.slice(keyIndex+keyLenghth);}
            var id = "ResultList[" + index + "].id";
            var thingsBefore = "ResultList[" + index + "].thingsBefore";
            var things = "ResultList[" + index + "].things";
            var thingsAfter = "ResultList[" + index + "].thingsAfter";
            var type = "ResultList[" + index + "].type";
      
            Result.push({             
              "id": itemid,
              "thingsBefore": startStr,
              "things": this.data.searchWord,
              "thingsAfter": endStr,
              "type": itemtype
            })

          }
          this.setData({
            Tohidden: false,
            ResultList: Result
          })
          }
        },
        fail: () => { },
        complete: () => { }
      });
    }else{
      this.setData({
        Tohidden: true,
        ResultList: null
      })
    }
  }

})