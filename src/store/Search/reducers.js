import {
    SEARCH_RESULTS_FETCH,
 SEARCH_RESULTS_SUCCESS,
 SEARCH_RESULTS_FAILURE,
 ADD_RECENT_SEARCHES,
 SEARCH_CHANGE_PAGE,
 ADD_TO_FAVORITES,
 CLEAR_SEARCH
} from './actions';

export function search(state = {
  isFetching: false,
  results: null,
  message: null,
  searches: [],
  favorites: []
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
      case ADD_RECENT_SEARCHES:
            return Object.assign({}, state, {
            searches: action.data
        })
      case SEARCH_CHANGE_PAGE:
      return Object.assign({}, state, {
        isFetching: true,
        message: action.message,
        results: null
      })
      case ADD_TO_FAVORITES:
            return Object.assign({}, state, {
            favorites: action.data
        })
        case CLEAR_SEARCH:
        return Object.assign({}, state, {
          isFetching: false,
          message: action.message,
          results: null
        })

    default:
      return state
  }
}
