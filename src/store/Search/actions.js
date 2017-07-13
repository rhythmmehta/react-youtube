import {search} from '../../api/search';
export const SEARCH_RESULTS_FETCH = 'SEARCH_RESULTS_FETCH';
export const SEARCH_RESULTS_SUCCESS = 'SEARCH_RESULTS_SUCCESS';
export const SEARCH_RESULTS_FAILURE = 'SEARCH_RESULTS_FAILURE';

export function intiateSearchResults() {
    return {
        type: SEARCH_RESULTS_FETCH
    }
}

export function searchResultsSuccess(data) {
    return {
        type: SEARCH_RESULTS_SUCCESS,
        results: data
    }
}

export function searchResultsFailure() {
    return {
        type: SEARCH_RESULTS_FAILURE,
        message: 'NO results found'
    }
}

export function getSearchResults(searchString) {
    return async (dispatch, getState) => {
        try{
            dispatch(intiateSearchResults());

            let results = await search(searchString);

            if( results) {
                dispatch(searchResultsSuccess(results));
            } else {
                dispatch(searchResultsFailure());
            }


        } catch(e) {
            console.log(e);
            dispatch(searchResultsFailure());
        }
  }
}
