import { combineReducers } from 'redux'
import { search } from './Search/reducers';
import { toaster } from './Toaster/reducer';
import { auth } from './Auth/reducers';
import {signup} from './SignUp/reducers';
const rootReducer = combineReducers({
    search,
    toaster,
    auth,
    signup

})



export default rootReducer
