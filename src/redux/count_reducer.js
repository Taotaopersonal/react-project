export default (preState=0,action) => {
  const { type, data } = action
  let newState
  switch (type) {
    case 'increment':
    newState = preState + data
    return newState
    case 'decrement':
    newState = preState - data
    return newState
    default:
      return preState
  }
}