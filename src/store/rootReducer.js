import { combineReducers } from 'redux'
import { search } from './Search/reducers';
import { toaster } from './Toaster/reducer';

const rootReducer = combineReducers({
    search,
    toaster

})


export default rootReducer
