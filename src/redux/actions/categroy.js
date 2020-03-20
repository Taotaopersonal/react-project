import { SAVE_CATEGROY_INFO } from '../actions_type'

const createSaveCategroyAction = (categroyObj) => ({ type: SAVE_CATEGROY_INFO, data: categroyObj })

export const createSaveCategroyAsyncAction = (categroyObj) => {
  return dispatch => {
    dispatch(createSaveCategroyAction(categroyObj))
  }
}