import { SAVE_ADMIN_TITLE } from '../actions_type'

export default (prestate = '', action) => {
  const { type, data } = action
  let newState
  switch (type) {
    case SAVE_ADMIN_TITLE:
      newState = data;
      return newState
    default:
      return prestate
  }
}