// components/quiz/quiz.js

Component({

  /**
   * 组件的初始数据
   */
  data: {
    TabCur: 0,
    scrollLeft: 0
  },
    methods: {
      tabSelect(e) {
        this.setData({
          TabCur: e.currentTarget.dataset.id,
          scrollLeft: (e.currentTarget.dataset.id - 1) * 60
        })
      }
  }

})
