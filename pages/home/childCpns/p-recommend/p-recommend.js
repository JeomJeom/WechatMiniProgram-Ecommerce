// pages/home/childCpns/p-recommend/p-recommend.js
Component({
  /**
   * Component properties
   */
  properties: {
    recommends:{
      type: Array,
      value: [] //default value
    }
  },

  /**
   * Component initial data
   */
  data: {
    //create a variable
    isLoad: false
  },

  /**
   * Component methods
   */
  methods: {
    hidleImageLoad(){
      if (!this.isLoad){
        this.triggerEvent('imageLoad')
        this.data.isLoad =true   //not need to use setData 
      }
    }
  }
})
