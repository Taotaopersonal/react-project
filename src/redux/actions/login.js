import { SAVE_USER_INFO,DELETE_USER_INFO } from '../actions_type'

export const createSaveUserInfoAction = userObj => {
  localStorage.setItem('user',JSON.stringify(userObj.user))
  localStorage.setItem('token',userObj.token)
  return  { type: SAVE_USER_INFO, data: userObj }
}

export const createDeleteUserInfoAction = () => {
  localStorage.clear()
  return  { type: DELETE_USER_INFO}
}