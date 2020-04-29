// pages/home/home.js
//import request from '../../service/network.js'
import {
  getMultiData,
  getProdData
} from '../../service/home.js'

const TOP_DISTANCE = 1000;
const types = ['pop','new','sell']
Page({
  /**
   * Page initial data
   */
  data: {
    banners: [],
    recommends:[],
    titles: ['Popular','New Arrivals','Sale'],
    products: {
      'pop':{page:0, list:[]},
      'new':{page:0, list:[]},
      'sell':{page:0, list:[]} // name must match with variable name on API data
    },
    currentType:'pop',
    showBackTop: false,
    isTabFixed: false,
    tabScrollTop: 0
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    //1.request slideshow and recommended data
    this._getMultiData()

    //2.request Product data
    this._getProdData('pop')
    this._getProdData('sell')
    this._getProdData('new')
  },

  //--------------------create a new function to get Network Request--------------------
  _getMultiData(){
    getMultiData().then(res => {
      //retrieve slideshow and recomended data
      const banners = res.data.data.banner.list
      const recommends = res.data.data.recommend.list

      //putting banners and recommends into data
      this.setData({
        banners,
        recommends
      })
    })
  },
  _getProdData(type){
    //1. get page number -- page numbers are fixed, so there is unnecessarily to return a page parameter
    const page = this.data.products[type].page + 1

    //2. send Network request
    getProdData(type,page).then(res=> {
      //console.log(res)
      //2.1 retrieve data
      const list = res.data.data.list;

      //2.2. push data into corresponding list in 'type'
      const oldList = this.data.products[type].list
      oldList.push(...list)  //ES6
      
      //2.3. push data into products in 'data'
      const typeKey = `products.${type}.list` //ES6
      const pageKey = `products.${page}.list`
      this.setData({
        [typeKey]: oldList,
        [pageKey]: page
      })
    })
  },

  //-------------------- Event Listener function --------------------
  handleTabClick(event){
    //retrieve index
    const index = event.detail.index;
    
    //set currentType
    this.setData({
      currentType: types[index]
    })
  },
  handleImageLoad(){
    //solution 2: Better ways
    setTimeout(() => {
      wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect => {
        this.data.tabScrollTop = rect.top
      }).exec()
    },1000)
  },
  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   * Does page showing imply all the picture being loaded???
   *  NOOOOOO!!!!
   */
  onShow: function () {
    //solution 1 : Using setTimeout , but not an effective solution
    //setTimeout(() => {
      //wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect => {
        //console.log(rect)
      //}).exec()
    //},1000)
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {
    //pull up to get more details -> request for new data
    this._getProdData(this.data.currentType)
  },
  onPageScroll(options){
    // 1. retrieve scrollTop
    const scrollTop =options.scrollTop;
    
    //2. edit showBackTop property
    //offical: DONT frequently invoking this.setData during scroll function callback
          // this.setData({
          //  showBackTop: srollTop >= TOP_DISTANCE
          // }) 
    // Solution: and to increase performance
    const flag1 = scrollTop >=TOP_DISTANCE
    if (flag1 != this.data.showBackTop){
      this.setData({
        showBackTop: flag1
        }) 
    }
    
    //3. edit isTabFixed property
    const flag2 = scrollTop >= this.data.tabScrollTop;
    if (flag2 != this.data.isTabFixed){
      this.setData({
        isTabFixed: flag2
      })
    }
    
  },
  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
  
})