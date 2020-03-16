import {
  INCREMENT,
  DECREMENT
} from '../action_type'

export const createIncrementAction = value => ({
  type: INCREMENT,
  data: value
})
export const createDecrementAction = value => ({
  type: DECREMENT,
  data: value
})
export const createIncrementAsyncAction = (value, time) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(createIncrementAction(value))
    }, time)
  }
}