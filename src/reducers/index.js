import {combineReducers} from 'redux'

import AuthReducer from './AuthReducer'
import postReducer from './postReducer'

export const reducers=combineReducers({
     AuthReducer,
     postReducer
})