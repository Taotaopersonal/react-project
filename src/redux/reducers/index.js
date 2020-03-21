import {combineReducers} from 'redux'
import loginReducer from './login'
import headerReducer from './header'
import categroyReducer from './categroy'

export default combineReducers({
  userInfo: loginReducer,
  title: headerReducer,
  categroyList:categroyReducer
})