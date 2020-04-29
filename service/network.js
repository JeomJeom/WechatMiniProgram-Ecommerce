import {
  baseURL
} from './config.js'

export default function(options){
  //Using Promise method to encapulate the wx.request, so whenever Wechat changes their default codes, we can change the code from these line accordingly.
  return new Promise((resolve,reject) => {
      wx.request({
        // url:options.url, //Method2
        url:baseURL + options.url, //Method 3
        method:options.method || 'get',
        data:options.data ||{},
        success: resolve,
        fail: reject
      })
    })
}