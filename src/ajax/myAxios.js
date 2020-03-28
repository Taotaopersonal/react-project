import axios from 'axios'
import qs from 'querystring'
import { message } from 'antd'
import store from '../redux/store'
import { TOKENHEAD } from '../config/index'
import {createDeleteUserInfoAction} from '../redux/actions/login'
import {createSaveTitleAction} from '../redux/actions/header'

axios.defaults.baseURL = 'http://localhost:3000'

axios.interceptors.request.use(config => {
  const {
    method,
    data
  } = config
  const {token} = store.getState().userInfo
  if(token) config.headers.authorization = TOKENHEAD + token
  if (method.toLowerCase() === 'post' && data instanceof Object) {
    config.data = qs.stringify(data);
  }
  return config
})

axios.interceptors.response.use(
  response => response.data,
  err => {
    if (err.response.status === 401) {
      message.error('身份已过期,请重新登录! 2秒后跳转到登录页面')
      setTimeout(()=>{
        store.dispatch(createDeleteUserInfoAction())
        store.dispatch(createSaveTitleAction(''))
      },2000)
    } 
    else {
      message.error(err.message)
    }
    return new Promise(() => {})
  }
)

export default axios