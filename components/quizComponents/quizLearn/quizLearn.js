const app = getApp();

Component({
  options: {
    addGlobalClass: true,
  },
  pageLifetimes: {
    
    show: function () {
      
      var that = this
      this.animation = wx.createAnimation()
      this.learnAnimation = wx.createAnimation()
      this.collectionAnimation = wx.createAnimation()

      wx.getStorage({
        key: 'openid',
        success: function(res) {

          that.setData({
            openid:res.data
          })
        },
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  },
  data: {
    collectionHidden:'hidden',
    learnHidden:'hidden', 
    openid:null,
    collection:[][{}],
    deleteList:[],
    showCollection:'',
    learnMaterial:[][{}],
    currentType:'',
    elements: [{
      title: '干垃圾',
      name: 'Residual Waste',
      color: '#333333',
      backgroundImage:'linear-gradient(45deg, #33333370, #CCCCCC50)',
      icon: 'icon-ganlaji-icon'
    },
    {
      title: '湿垃圾',
      name: 'Household Food Waste',
      color: '#663333',
      icon: 'icon-shilaji-icon',
      backgroundImage:'linear-gradient(45deg, #664C3370, #66333350);'
    },
    {
      title: '有害垃圾',
      name: 'Hazardous Waste',
      color: '#FF3333',
      icon: 'icon-youhailaji-icon',
      backgroundImage:'linear-gradient(45deg, #FF333370, #ff993350)'
    },
    {
      title: '可回收垃圾',
      name: 'Recycle Waste',
      color: '#336699',
      icon: 'icon-zkehuishoulaji',
      backgroundImage:'linear-gradient(45deg, #33669970, #33999950)'
    }
    ],
  },
  methods:{
    learn(){
      var that = this
      that.updateCollection()
      this.animation.opacity(1).step({ duration: 200 })
      this.learnAnimation.opacity(0).step()
      this.setData({ 
        animation: this.animation.export({ timingFunction: 'ease-out', duration: 300 }),
        learnAnimation: this.learnAnimation.export({ timingFunction: 'ease-out', duration: 300 }),
        currentType:'',
        learnHidden:'hidden'
        })
        
    },

    collect(e){
      console.log(e)
      var that = this
      var collection = "learnMaterial[" + e.currentTarget.dataset.index + "].collection";

      that.setData({
        [collection]: (that.data.learnMaterial[e.currentTarget.dataset.index].collection == "collectionBefore.png" ? "collectionAfter.png" :"collectionBefore.png")
      })
      },

    collectionList(){
      var that = this
      if(that.data.collectionHidden == 'hidden'){
        that.setData({
          collectionHidden:''
        })
      }
      this.animation.opacity(0).step()
      // this.learnAnimation.opacity(0).step()
      this.collectionAnimation.opacity(1).step()
      this.setData({
        animation: this.animation.export({ timingFunction: 'ease-out', duration: 300 }),
        // learnAnimation: this.learnAnimation.export({ timingFunction: 'ease-out', duration: 0 }),
        collectionAnimation: this.collectionAnimation.export({ timingFunction: 'ease-out', duration: 300 }),
      })

      wx.request({
        url: app.globalData.url + '/collection/findByOpenid',
        data: {
          openid: that.data.openid
        },
        method: 'GET',
        dataType: 'json',
        success: function(res) {
          console.log("---------",res.data)
          var Result = [];
          for (var index in res.data) {
            var itemquizId = res.data[index].quizId;
            var itemThings = res.data[index].things
            var itemType = res.data[index].type;
            var itemCollection = "collectionAfter.png"

            var quizId = "collection[" + index + "].quizId";
            var things = "collection[" + index + "].things";
            var type = "collection[" + index + "].type";
            var collection = "collection[" + index + "].collection";

            Result.push({
              "quizId": itemquizId,
              "things": itemThings,
              "type": itemType,
              "collection": itemCollection,
            })
          }

          that.setData({
            collection:Result
          })

        },
        fail: function(res) {},
        complete: function(res) {},
      })
      

    },

    unCollect(e){
      console.log(e)
      var that = this
      var collection = "collection[" + e.currentTarget.dataset.index + "].collection";
      console.log(e.currentTarget.dataset.item.collection)
      that.setData({
        [collection]: (that.data.collection[e.currentTarget.dataset.index].collection == "collectionBefore.png" ? "collectionAfter.png" :"collectionBefore.png")
      })
    },
    deleteCollection(){
      var that = this
      var Result = []
      for (var index in that.data.collection) {
        if (that.data.collection[index].collection == "collectionBefore.png") {
          Result.push({
            "quizId": that.data.collection[index].quizId,
            "openid": that.data.openid
          })
        }
      }
      console.log(Result)
      if (Result.length != 0) {
        console.log(Result)
        wx.request({
          url: app.globalData.url + '/collection/deleteCollection',
          data: Result,
          method: 'POST',
          dataType: 'json',
          responseType: 'text',
          success: function(res) {
            that.setData({
              collection:''
            })

            wx.request({
              url: app.globalData.url + '/collection/findByOpenid',
              data: {
                openid: that.data.openid
              },
              method: 'GET',
              dataType: 'json',
              success: function(res) {
                console.log(res)
                var Result = [];
                for (var index in res.data) {
                  var itemquizId = res.data[index].quizId;
                  var itemThings = res.data[index].things
                  var itemType = res.data[index].type;
                  var itemCollection = "collectionAfter.png"
      
                  var quizId = "collection[" + index + "].quizId";
                  var things = "collection[" + index + "].things";
                  var type = "collection[" + index + "].type";
                  var collection = "collection[" + index + "].collection";
      
                  Result.push({
                    "quizId": itemquizId,
                    "things": itemThings,
                    "type": itemType,
                    "collection": itemCollection,
                  })
                }
      
                that.setData({
                  collection:Result
                })
      
              },
              fail: function(res) {},
              complete: function(res) {},
            })

          },
          fail: function(res) {},
          complete: function(res) {},
        })
      }


    },

    collectionBack(){
      this.animation.opacity(1).step()
      this.collectionAnimation.opacity(0).step()
      this.setData({
        animation: this.animation.export({ timingFunction: 'ease-out', duration: 300 }),
        collectionAnimation: this.collectionAnimation.export({ timingFunction: 'ease-out', duration: 300 }),
      })
      this.setData({
        collectionHidden: 'hidden'
      })
    },

      updateCollection(){
        var that = this
        var Result = []
        for (var index in that.data.learnMaterial) {
          if (that.data.learnMaterial[index].collection == "collectionAfter.png") {
            Result.push({
              "quizId": that.data.learnMaterial[index].id,
              "things": that.data.learnMaterial[index].things,
              "type": that.data.learnMaterial[index].type,
              "openid": that.data.openid
            })
          }
        }
        if (Result.length != 0) {
          wx.request({
            url: app.globalData.url + '/collection/insertCollection',
            data: Result,
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: function(res) {

            },
            fail: function(res) {},
            complete: function(res) {

            },
          })
        }
      },


    chooseModel(e) {
      var that = this

      if(that.data.learnHidden == 'hidden'){
        that.setData({
          learnHidden: ''
        })
      }

      that.updateCollection();
      try{
        that.setData({
          currentType: e.currentTarget.dataset.item.title
        })
      }catch(e){
        that.setData({
          currentType: that.data.currentType
        })
      }
      
      this.animation.opacity(0).step()
      this.learnAnimation.opacity(1).step()
      this.collectionAnimation.opacity(0).step()
      this.setData({ 
        animation: this.animation.export({timingFunction: 'ease-out',duration: 300}),
        learnAnimation: this.learnAnimation.export({ timingFunction: 'ease-out', duration: 300 }),
        collectionAnimation: this.collectionAnimation.export({ timingFunction: 'ease-out', duration: 300 }),
        })
      
      wx.request({
        url: app.globalData.url + '/recycle/' + (that.data.currentType != '' ? 'randomList' : 'totalRandomList'),
        data: {
          type: that.data.currentType
        },
        method: 'GET',
        dataType: 'json',
        success: function(res) {

          var Result = [];            
          for (var index in res.data) {
          var itemId = res.data[index].id;
          var itemThings = res.data[index].things
          var itemType = res.data[index].type;
          var itemCollection = "collectionBefore.png"

          var id = "learnMaterial[" + index + "].id";
          var things = "learnMaterial[" + index + "].things";
          var type = "learnMaterial[" + index + "].type";
          var collection = "learnMaterial[" + index + "].collection";

            Result.push({
              "id": itemId,
              "things": itemThings,
              "type": itemType,
              "collection": itemCollection,
            })
          }

          that.setData({
            learnMaterial: (Result.length > 9 ? Result.slice(5) : Result.slice(2))
          })
        },
        fail: function(res) {},
        complete: function(res) {},
      })

    },
    move(e){
      
    }
  }
})

