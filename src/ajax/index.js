import myAxios from './myAxios'
import jsonp from 'jsonp'
import {
  message
} from 'antd'
import {
  LOCATION,
  AK,
  HREF
} from '../config'
//登录请求
export const reqLogin = (username, password) => myAxios.post('/login', {
  username,
  password
})
//请求天气
export const reqWeather = () => {
  const url = `${HREF}?location=${LOCATION}&output=json&ak=${AK}`
  return new Promise((rs) => {
    jsonp(url, (err, data) => {
      if (!err) {
        rs(data.results[0].weather_data[0])
      } else {
        message.error(err.message)
      }
    })
  })
}
//请求分类列表
export const reqCategroyList = () => myAxios.get('/manage/category/list')
//请求添加分类
export const reqAddCategory = (categoryName) => myAxios.post('/manage/category/add', {
  categoryName
})
//请求更新分类信息,分类名
export const reqUpdateCategory = (categoryId, categoryName) => myAxios.post('/manage/category/update', {
  categoryId,
  categoryName
})
//通过页码和每页商品数请求商品列表
export const reqProductByPage = (pageNum, pageSize) => myAxios.get('/manage/product/list', {
  params: {
    pageNum,
    pageSize
  }
})
//通过搜索类型和页码和每页商品数请求商品列表
export const reqSearchProductByPage = (searchType, keyWord, pageNum, pageSize) => myAxios.get('/manage/product/search', {
  params: {
    [searchType]: keyWord,
    pageNum,
    pageSize
  }
})
//请求改变商品上下架状态
export const reqChangeProductStatus = (productId, status) => myAxios.post('/manage/product/updateStatus', {
  productId,
  status
})