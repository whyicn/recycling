// components/provinceshadow/provinceshadow.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    hiddenname: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    selectprovince(e) {
      console.log(e)
      var that = this;

      console.log(that.data.tohidden);

      this.setData({
        tohidden: !that.data.tohidden,
      })
    }
  }
})
