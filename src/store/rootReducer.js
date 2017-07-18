import { combineReducers } from 'redux'
import { search } from './Search/reducers';
import { toaster } from './Toaster/reducer';
import { auth } from './Auth/reducers';
const rootReducer = combineReducers({
    search,
    toaster,
    auth

})


export default rootReducer
