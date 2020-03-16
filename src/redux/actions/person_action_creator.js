import { ADD_PERSON } from '../action_type'

export const createAddPersonAction = (personObj) => ({type:ADD_PERSON,data:personObj})