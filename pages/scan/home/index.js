// pages/scan/home/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "imageTemplatePath":""
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
  takePhoto(){
    wx.wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['camera'],
      success: (result) => {
        console.log(res.tempFilePaths);
      },
      fail: () => {},
      complete: () => {}
    });
      
  },

  choosePhoto() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths;
/*         wx.compressImage({
          src: 'tempFilePaths', // 图片路径
          quality: 50, // 压缩质量
          success(res){
            var tempFilePaths = res.tempFilePaths;
            console.log("choosePhoto" + tempFilePaths)
            this.setData({
              tempFilePaths
            })
            wx.redirectTo({
              url: 'pages/scan/choosePhoto/index?tempFilePaths='+tempFilePaths,
              
            })
          }
        }) */
      }
    })
  }

})