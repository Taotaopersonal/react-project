import { SAVE_USER_INFO,DELETE_USER_INFO } from '../actions_type'

let _user = JSON.parse(localStorage.getItem('user'))
let _token = localStorage.getItem('token')

let initState = {
  user: _user || {},
  token: _token || '',
  isLogin:_user&&_token ? true : false
}
export default (perState=initState,action) => {
  const {type,data} = action
  let newState
  switch (type) {
    case SAVE_USER_INFO:
      const {user,token} = data
      newState = {user,token,isLogin:true}
      return newState
    case DELETE_USER_INFO:
      return {user:{},token:'',isLogin:false}
    default:
      return perState
  }
}