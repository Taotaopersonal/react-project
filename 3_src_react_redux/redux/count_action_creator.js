import {
  INCREMENT,
  DECREMENT
} from './action_type'

export const createIncrementAction = value => ({
  type: INCREMENT,
  data: value * 1
})
export const createDecrementAction = value => ({
  type: DECREMENT,
  data: value * 1
})