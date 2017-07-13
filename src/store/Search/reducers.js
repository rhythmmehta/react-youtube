import {
    SEARCH_RESULTS_FETCH,
 SEARCH_RESULTS_SUCCESS,
 SEARCH_RESULTS_FAILURE,
} from './actions';

export function search(state = {
  isFetching: false,
  results: null,
  message: null
}, action) {
  switch (action.type) {
    case SEARCH_RESULTS_FETCH:
      return Object.assign({}, state, {
        isFetching: true,
        message: null,
        results: null
      })
    case SEARCH_RESULTS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        results: action.results
      })
    case SEARCH_RESULTS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        results: null,
        message: action.message
      })
     
    default:
      return state
  }
}
