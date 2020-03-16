import {
  INCREMENT,
  DECREMENT
} from './action_type'

export default (preState = 0, action) => {
  const {
    type,
    data
  } = action
  let newState
  switch (type) {
    case INCREMENT:
      newState = preState + data
      return newState
    case DECREMENT:
      newState = preState - data
      return newState
    default:
      return preState
  }
}