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

export const reqLogin = (username, password) => myAxios.post('/login', {
  username,
  password
})

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

export const reqCategroy = () => myAxios.get('/manage/category/list')

export const reqAddCategroy = (categroyName) => myAxios.post('/manage/category/add',{categroyName})
