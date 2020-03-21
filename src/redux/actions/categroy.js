import { message } from 'antd'
import { SAVE_CATEGROY_INFO,DELETE_CATEGROY_INFO } from '../actions_type'
import { reqCategroyList } from '../../ajax/index'

const createSaveCategroyAction = (categroyArr) => ({ type: SAVE_CATEGROY_INFO, data: categroyArr })

export const createSaveCategroyAsyncAction = () => {
  return async dispatch => {
    let result = await reqCategroyList()
    const { status, data, msg } = result
    if (status === 0) {
      dispatch(createSaveCategroyAction(data))
    }
    else {
      message.error(msg)
    }
  }
}

export const createDeleteCategroyAction = () => ({ type: DELETE_CATEGROY_INFO})