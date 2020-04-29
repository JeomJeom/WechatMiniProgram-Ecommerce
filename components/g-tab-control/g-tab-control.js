// components/g-tab-control/g-tab-control.js
Component({
  /**
   * Component properties
   */
  properties: {
    titles:{
      type: Array,
      value:[] //default value
    }
  },

  /**
   * Component initial data
   */
  data: {
    currentIndex: 0
  },

  /**
   * Component methods
   */
  methods: {
    itemClick(e) {
      // 1.设置最新的index
      this.setData({
        currentIndex: e.currentTarget.dataset.index
      })

      // 2.发出时间
      const data = {index: this.data.currentIndex}
      this.triggerEvent("tabclick", data, {})
    },
    setCurrentIndex(index) {
      console.log(index)
      this.setData({
        currentIndex: index
      })
    }
  }
})
