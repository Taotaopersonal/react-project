import Count from '../components/count'
import {
  connect
} from 'react-redux'
import {
  createIncrementAction,
  createDecrementAction,
  createIncrementAsyncAction
} from '../redux/count_action_creator'

/* function mapStateToProps(state){
  return {number:state}
}

function mapDispatchToProps(dispatch) {
  return {
    increment: value => dispatch(createIncrementAction(value)),
    decrement: value => dispatch(createDecrementAction(value))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Count) */


/* export default connect(
  state=>({number:state}),
  dispatch => ({
    increment: value => dispatch(createIncrementAction(value)),
    decrement: value => dispatch(createDecrementAction(value))
  })
)(Count) */


export default connect(
  state => ({number: state}),
  {
    increment: createIncrementAction,
    decrement: createDecrementAction,
    incrementAsync:createIncrementAsyncAction
  }
)(Count)