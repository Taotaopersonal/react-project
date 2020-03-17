import axios from 'axios'
import qs from 'querystring'
import {message} from 'antd'

axios.defaults.baseURL = 'http://localhost:3000'

axios.interceptors.request.use(config => {
  const {
    method,
    data
  } = config
  if (method.toLowerCase() === 'post' && data instanceof Object) {
    config.data = qs.stringify(data);
  }
  return config
})

axios.interceptors.response.use(
  response => response.data,
  err => {
    message.error(err.message)
    return new Promise(() => {})
  }
)

export default axios