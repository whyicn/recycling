const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    list: [{
        title: '湿垃圾',
        img: 'https://ae01.alicdn.com/kf/H7434402726f24820a463fccfad45a564L.png',
        url: '/indexes/indexes'
      },
      {
        title: '干垃圾',
        img: 'https://ae01.alicdn.com/kf/Hae8031b12603406fa9dbf2c45f3a09f21.png',
        url: '/drawer/drawer'
      },
      {
        title: '有害垃圾',
        img: 'https://ae01.alicdn.com/kf/H475426f5229745568b36cb1af16e61adQ.png',
        url: '/animation/animation'
      },
      {
        title: '可回收垃圾',
        img: 'https://ae01.alicdn.com/kf/Hd35e5e41f9c24105882b3f213686fc152.png',
        url: '/verticalnav/verticalnav'
      }
    ]
  },

  scanPic() {
    wx.navigateTo({
      url: '/pages/guide/scan/index',
    })
  },

  province() {
    wx.showModal({
      title: '提示',
      content: '  ',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  searchPage() {
    wx.navigateTo({
      url: '/pages/guide/search/index',
    })
  }
})