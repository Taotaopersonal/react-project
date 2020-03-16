import {
  combineReducers
} from 'redux'
import CountReducer from './count_reducer'
import PersonReducer from './person_reducer'

export default combineReducers({
  count: CountReducer,
  person: PersonReducer
})