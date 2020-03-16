import {
  connect
} from 'react-redux'
import Person from '../components/person'
import {
  createAddPersonAction
} from '../redux/actions/person_action_creator'

export default connect(
  state => ({
    personCount: state.person.length,
    persons: state.person,
    count:state.count
  }), {
    add: createAddPersonAction
  }
)(Person)