const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    ScreenHeight: app.globalData.ScreenHeight,
    ScreenWidth: app.globalData.ScreenWidth,
    cameraresult: 'upcameraresult',
    downcameraresult: 'downcameraresult',
    resultState: "cameraresult",
    pictureState:"uploadimage",
    src: false
  },


  onLoad() {
    this.ctx = wx.createCameraContext()
    this.fadedPicAnimation = wx.createAnimation();
  },
  onReady(){

  },
    takePhoto() {
      console.log("take phtot");
      this.ctx.takePhoto({
        quality: 'high',
        success: (res) => { 
          console.log(res);
          this.setData({
            resultState: 'upcameraresult',
            src: res.tempImagePath
          })
        }
      })
    },

    BackPage() {
      wx.navigateBack({
        delta: 1
      });
    },
    stopScroll() {

    },
    foldlogo(){

      // this.fadedPicAnimation.opacity(0.3).step()
      // this.setData({
      //   fadedPicAnimation: this.fadedPicAnimation.export({ timingFunction: 'ease-out', duration: 1000 }),
      // })
      this.setData({
        resultState:'downcameraresult',
        pictureState:'downloadimage'
      })

      console.log(!this.resultState);
      setTimeout(() => {
        this.setData({
          src: false,
          resultState:'cameraresult',
          pictureState:'uploadimage'
        })
      }, 2100);
      console.log(!this.resultState);
    },

    imagechoose(){
      wx.chooseImage({

        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album'],
        
        success: (result) => {
          console.log(result);
          
          this.setData({
            resultState: 'upcameraresult',
            src: result.tempFilePaths
          })
        },

        fail: () => {},
        complete: () => {}
      });
        
    }
    
  
})