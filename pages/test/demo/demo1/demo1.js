// pages/test/demo/demo1/demo1.js
Page({

  ajaxRequest(){
    wx.request({
      url: 'http://localhost:8080/Recycling_war/recycle/blurSearch',
      data: {
        searchWord:"湿",
      },
      method: 'get',
      dataType: 'json',
      success: (result)=>{
        console.log(result);
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },

  /**
   * 页面的初始数据
   */
  data: {
    annimationTime:null,
    annimationBefore: "animation-name:a1; animation-duration: 2s; animation-fill-mode: forwards;",
    annimationAfter: "animation-name:a2; animation-duration: 2s; animation-fill-mode: forwards;",
    annimation: "animation-name:a1; animation-duration: 2s; animation-fill-mode: forwards;",
    username: "sadfas",
    password : "asfsda",
    animation: '',
    tabs: [
      {
        id: 0,
        name: "首页",
        isActive: true
      },
      {
        id: 1,
        name: "原创",
        isActive: false
      },
      {
        id: 2,
        name: "分类",
        isActive: false
      },
      {
        id: 3,
        name: "关于",
        isActive: false
      }
    ]
  },
  annimation(e){
    console.log(e.timeStamp)
    if (this.data.annimationTime == null){
      this.setData({
        annimationTime: e.timeStamp,
      })
    }
    if ((e.timeStamp - this.data.annimationTime) > 2000){
      if (this.data.annimation == this.data.annimationBefore) {
        this.setData({
          annimationTime: e.timeStamp,
          annimation: this.data.annimationAfter
        })
      } else {
        this.setData({
          annimationTime: e.timeStamp,
          annimation: this.data.annimationBefore
        })
      }
    }
    

    
  },

  request() {
    console.log("发送请求")
    console.log(this.username, this.password);
    wx: wx.request({
      url: 'http://localhost:8080/SpringMvc_quickStart_war/helloController/wechat?username=dsjaslg&password=sadgsdf',

      header: {},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res);
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  // 放大效果函数
  scale(e) {
    console.log(e);
    var index = e.currentTarget.dataset.index; //下标
    var item = this.data.list[index].animation; //获取每一个的动画
    let animation = wx.createAnimation({ //实例化一个动画
      // 动画持续时间，单位ms，默认值 400
      duration: 200,
      timingFunction: 'ease-out',
    })
/*     this.data.list.forEach((item, index) => { //每次点击清除之前的所有动画效果
      if (item.animation) { //如果有动画就把动画执行回去，这里考虑过直接清除对象内容，item.animation = {},内容是清楚了，但是界面的效果是保留了之前的操作的。
        animation.scale(1).step(); //变回原形
        this.data.list[index].animation = animation.export() //把动画渲染出去
      }
      this.setData({     //保存动画内容并渲染到页面
        list: this.data.list
      })
    }); */

    animation.scale(0.90).step(); //执行点击放大的效果
    this.data.list[index].animation = animation.export() //渲染动画

    this.setData({  //保存动画内容并渲染到页面
      list: this.data.list
    })
  },

  reset(e) {
    console.log(e);
    var index = e.currentTarget.dataset.index; //下标
    var item = this.data.list[index].animation; //获取每一个的动画
    let animation = wx.createAnimation({ //实例化一个动画
      // 动画持续时间，单位ms，默认值 400
      duration: 200,
      timingFunction: 'ease-out',
    })
/*     this.data.list.forEach((item, index) => { //每次点击清除之前的所有动画效果
      if (item.animation) { //如果有动画就把动画执行回去，这里考虑过直接清除对象内容，item.animation = {},内容是清楚了，但是界面的效果是保留了之前的操作的。
        animation.scale(1).step(); //变回原形
        this.data.list[index].animation = animation.export() //把动画渲染出去
      }
      this.setData({     //保存动画内容并渲染到页面
        list: this.data.list
      })
    }); */

    animation.scale(1).step(); //执行点击放大的效果
    this.data.list[index].animation = animation.export() //渲染动画

    this.setData({  //保存动画内容并渲染到页面
      list: this.data.list
    })
  },


  // 自定义事件 用来接收自组建传递的数据
  handleItemChange(e){
    // console.log(e);
    console.log(e.detail  );
    const {index} = e.detail;
    let {tabs} = this.data;
    tabs.forEach((v,i) =>  i === index ? v.isActive = true:v.isActive=false);
    this.setData({
      tabs
    })
    console.log(index);    
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     console.log("onload");
    //  onLoad发送异步请求来初始化页面数据
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onready");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onshow");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // 卸载当前页面 不再回显
    console.log("onHide");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("onUnload");
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
  click(){
    var m = "啊十分激烈";

    var lenthStr = m.length;
    var keyStr = m.indexOf("激");
    var startStr = m.slice(0,keyStr);
    console.log(startStr);
    var endStr = m.slice(keyStr);
    console.log(endStr);
    
  }
})