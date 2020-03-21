import {
  SAVE_CATEGROY_INFO,
  DELETE_CATEGROY_INFO
} from '../actions_type'

export default (prestate = [], action) => {
  const {
    type,
    data
  } = action
  let newState
  switch (type) {
    case SAVE_CATEGROY_INFO:
      newState = [...data.reverse()];
      return newState
    case DELETE_CATEGROY_INFO:
      newState = [];
      return newState
    default:
      return prestate
  }
}