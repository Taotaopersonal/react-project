import { ADD_PERSON } from '../action_type'
export default (perState = [], action) => {
  const { type, data } = action
  let newState
  switch (type) {
    case ADD_PERSON:
      newState = [data, ...perState]
      return newState
    default:
      return perState
  }
}