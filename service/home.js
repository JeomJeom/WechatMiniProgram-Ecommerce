import request from './network.js'

//Method 2 => const baseURL = "http://123.207.32.32:8000"
//Method 3 => create a new js file (config.js) to store the baseURL

export function getMultiData(){
  return request({
    // url:'http://123.207.32.32:8000/home/multidata' //Method 1 => the promise method was applied to this request
    url:  '/home/multidata'
  })
}

//parameters are needed
export function getProdData(type, page){
  return request({
    url:'/home/data',
    data:{
      type, //es6 style
      page
    }
  })
}