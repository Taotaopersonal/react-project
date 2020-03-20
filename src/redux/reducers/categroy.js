import { SAVE_CATEGROY_INFO } from '../actions_type'

export default (prestate = [], action) => {
  const { type, data } = action
  let newState
  switch (type) {
    case SAVE_CATEGROY_INFO:
      newState = [...data.reverse()];
      return newState
    default:
      return prestate
  }
}