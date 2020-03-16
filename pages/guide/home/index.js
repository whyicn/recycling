const app = getApp();
Page({
  onLoad(){
    var that = this;
    
    this.detailAnimation = wx.createAnimation()

    this.randomList("湿垃圾");
    this.randomList("干垃圾");
    this.randomList("有害垃圾");
    this.randomList("可回收垃圾");
    wx.getStorage({
      key: 'selectedCity',
      success: function(res) {
        that.setData({
          selectedCity: res.data
        })
      },
    })
  },
  onReady() {

  },
  stopScroll() {
    console.log("stop scroll");
  },
  preventmove(e){
    console.log('哈哈哈');
  },

  selectprovince(e) {
    console.log(e)
    this.setData({
      tohidden: !this.data.tohidden
    })
  },

  unSelectprovince(){
    this.setData({
      cityAnination:this.data.cityAnination==this.cityAninationBefore?this.data.cityAninationAfter:this.data.cityAninationBefore
    })
    
    setTimeout(() => {
      this.setData({
        tohidden: !this.data.tohidden
      })  
    }, 200);
    
  },


  scale(e) {

    if (e.currentTarget.dataset.item.hiddenname){
    var index = e.currentTarget.dataset.index; //下标
    var item = this.data.list[index].animation; //获取每一个的动画
    let animation = wx.createAnimation({ //实例化一个动画
      // 动画持续时间，单位ms，默认值 400
      duration: 200,
      timingFunction: 'ease-in',
    })
      animation.scale(0.95).step(); //执行点击放大的效果
      this.data.list[index].animation = animation.export() //渲染动画
      this.setData({ //保存动画内容并渲染到页面
        list: this.data.list
      })
      
    }
    
  },
  
  open(e) {

    if (e.currentTarget.dataset.item.hiddenname) {
    var se = e;
    this.scale(se);
      
    // setTimeout(function () { console.log("tap等待") }, 300);

    var index = e.currentTarget.dataset.index; //下标
    var item = this.data.list[index].animation; //获取每一个的动画
    let animation = wx.createAnimation({ 
      duration: 400,
      timingFunction: 'ease-in',
    })

      // setTimeout(function () { console.log("等待了100毫秒") }, 100);
      animation.scale(1).step();
      this.data.list[index].hiddenname = false;
      this.data.list[index].animation = animation.export();
      this.setData({
        list: this.data.list
      })
    }
  },

  reset(e) {
    console.log(e);
    if (e.currentTarget.dataset.item.hiddenname) {
      
    var index = e.currentTarget.dataset.index; //下标
    console.log(index);
    var item = this.data.list[index].animation; //获取每一个的动画
    let animation = wx.createAnimation({ //实例化一个动画
      // 动画持续时间，单位ms，默认值 400
      duration: 250,
      timingFunction: 'linear',
    })
      animation.scale(1).step(); //执行点击放大的效果
      this.data.list[index].animation = animation.export() //渲染动画
      this.setData({ //保存动画内容并渲染到页面
        list: this.data.list
      })

    }

  },
  data: {
    cityAnination:"animation: blurItemStart; animation-duration: 200ms; animation-timing-function: linear; animation-fill-mode: forwards;",
    cityAninationBefore: "animation: blurItemStart; animation-duration: 200ms; animation-timing-function: linear; animation-fill-mode: forwards;",
    cityAninationAfter: "animation: blurItemEnd; animation-duration: 200ms; animation-timing-function: linear; animation-fill-mode: forwards;",

    cityAnimationDuration:null,
    tohidden: true,
    backhidden: true,
    selectedCity: '郑州',
    residual:[{
        id:null,
        things:null
      }],

    hazardous: [{
      id: null,
      things: null
    }],
    recyclable: [{
      id: null,
      things: null
    }],
    cityList: [
      { province: '北京' },
      { province: '无锡' },
      { province: '佛山' },
      { province: '合肥' },
      { province: '大连' },
      { province: '福州' },
      { province: '厦门' },
      { province: '哈尔滨' },
      { province: '济南' },
      { province: '温州' },
      { province: '南宁' },
      { province: '长春' },
      { province: '泉州' },
      { province: '石家庄' },
      { province: '贵阳' },
      { province: '常州' },
      { province: '南通' },
      { province: '嘉兴' },
      { province: '太原' },
      { province: '徐州' },
      { province: '南昌' },
      { province: '金华' },
      { province: '惠州' },
      { province: '珠海' },
      { province: '中山' },
      { province: '台州' },
      { province: '烟台' },
      { province: '兰州' },
      { province: '绍兴' },
      { province: '海口' },
      { province: '扬州' },
      { province: '成都' },
      { province: '杭州' },
      { province: '重庆' },
      { province: '武汉' },
      { province: '西安' },
      { province: '苏州' },
      { province: '天津' },
      { province: '南京' },
      { province: '长沙' },
      { province: '郑州' },
      { province: '东莞' },
      { province: '青岛' },
      { province: '沈阳' },
      { province: '宁波' },
      { province: '昆明' },
      { province: '上海' },
      { province: '广州' },
      { province: '深圳' }
    ],
    list: [{
        title: '干垃圾',
        img: 'https://ae01.alicdn.com/kf/Hae8031b12603406fa9dbf2c45f3a09f21.png',
        url: '/indexes/indexes',
        engtitle: 'RESIDUAL WASTE',
      iconfont: 'iconfont icon-ganlaji-icon',
        color: '#333333',
      hiddenname: true,
      tip:"既其他垃圾，是指可回收物、有害垃圾、湿垃圾以外的其他生活废弃物。包括砖瓦陶瓷、普通一次性电池（碱性电池）、受污染的一次性餐盒、卫生间废纸等",
      randomList: [{
        id: null,
        things: null,
      }]
      },
      {
        title: '湿垃圾',
        img: 'https://ae01.alicdn.com/kf/H7434402726f24820a463fccfad45a564L.png',
        url: '/drawer/drawer',
        engtitle: 'HOUSEHOLD FOOD WASTE',
        iconfont: 'iconfont icon-shilaji-icon',
        color: '#663333',
        hiddenname: true,
        tip:'既易腐垃圾，厨余垃圾、餐厨垃圾，是指餐饮垃圾、厨余垃圾及废弃食用油脂和集贸市场有机垃圾等易腐蚀性垃圾，包括废弃的食品、蔬菜、瓜果皮核以及家庭产生的花草、落叶等',
        randomList: [{
          id: null,
          things: null
        }]
      },
      {
        title: '有害垃圾',
        img: 'https://ae01.alicdn.com/kf/H475426f5229745568b36cb1af16e61adQ.png',
        url: '/animation/animation',
        engtitle: 'HAZARDOUS WASTE',
        iconfont: 'iconfont icon-youhailaji-icon',
        color: '#ff3333',
        hiddenname: true,
        tip:'是指对人体健康或者自然环境造成直接或潜在危害的生活垃圾，包括废电池、废弃药品、废杀虫剂、废水银产品等',
        randomList: [{
          id: null,
          things: null
        }]
      },
      {
        title: '可回收垃圾',
        img: 'https://ae01.alicdn.com/kf/Hd35e5e41f9c24105882b3f213686fc152.png',
        url: '/verticalnav/verticalnav',
        engtitle: 'RECYCLABLE WASTE',
        iconfont: 'iconfont icon-zkehuishoulaji',
        color: '#336699',
        hiddenname: true,
        tip:'是指适宜回收和资源化利用的生活垃圾，包括脂类，塑料、金属、玻璃、木材、织物和电子废弃物',
        randomList: [{
          id: null,
          things: null
        }]
      }
    ]
  },

  scanPic() {
    wx.navigateTo({
      url: '/pages/guide/scan/index',
    })
  },
  randomList(type){
    var that = this;
    wx:wx.request({
      url: app.globalData.url +'/recycle/randomList',
      data: {
        type:type
      },
      method: 'GET',
      dataType: 'json',
      success: function(res) {
        if(type == "湿垃圾"){
          var randomList = "list[1].randomList";
          that.setData({
            [randomList] : res.data
          })
          console.log(that.data.list[1].randomList);
        } else if (type == "干垃圾"){
          var randomList = "list[0].randomList";
          that.setData({
            [randomList]: res.data
          })
        } else if (type == "有害垃圾") {
          var randomList = "list[2].randomList";
          that.setData({
            [randomList]: res.data
          })
        }
        else if (type == "可回收垃圾") {
          var randomList = "list[3].randomList";
          that.setData({
            [randomList]: res.data
          })
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  selectCity(e){
    console.log(e);
    wx.setStorageSync("selectedCity", e.currentTarget.dataset.item.province)
    this.setData({
      selectedCity:e.currentTarget.dataset.item.province,
      tohidden: !this.data.tohidden,
    })
  },

  searchPage() {
    wx.navigateTo({
      url: '/pages/guide/search/index',
    })
  },

  reverse(e){

    var index = e.currentTarget.dataset.index; //下标
    var item = this.data.list[index].animation; //获取每一个的动画
    let animation = wx.createAnimation({ //实例化一个动画
      // 动画持续时间，单位ms，默认值 400
      duration: 400,
      timingFunction: 'linear',
    })
    console.log('-----------',e);
    animation.scale(0.93).step(); //变回原形
    this.data.list[index].animation = animation.export() //把动画渲染出去
    this.setData({     //保存动画内容并渲染到页面
    list: this.data.list
  })
    setTimeout(function () { console.log("等待了100毫秒") }, 500);
    animation.scale(1).step();
    this.data.list[index].hiddenname = true;
    this.data.list[index].animation = animation.export();
    this.setData({
      list:this.data.list
    })
    this.randomList(e.currentTarget.dataset.item.title)

  }

})