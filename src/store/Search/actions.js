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
            let recent;
            recent = getState().search.searches;
            let exists = recent.filter(x=>x===searchString);
            if(exists.length === 0) {
                recent.push(searchString);
                dispatch(addSearchResult(recent));
            }

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

export const ADD_RECENT_SEARCHES = 'ADD_RECENT_SEARCHES';

export function addSearchResult(search) {
    return {
        type: ADD_RECENT_SEARCHES,
        data: search
    }
}

export const SEARCH_CHANGE_PAGE ='SEARCH_CHANGE_PAGE';
export function getChangePage()
{
    return{
        type: SEARCH_CHANGE_PAGE,
        message: 'Page Change'

    }
}
import {changePage} from '../../api/search';
export function goToPage(searchString, changeToken){
    return async (dispatch, getState) => {
        try{
    dispatch(getChangePage());
    let results = await changePage(searchString,changeToken);

    if( results) {
        dispatch(searchResultsSuccess(results));
    } else {
        dispatch(searchResultsFailure());
    }
}
catch(e) {
    console.log(e);
    dispatch(searchResultsFailure());
   }
  }
}

export const ADD_TO_FAVORITES='ADD_TO_FAVORITES';
export function addToFav(results){
    return {
        type: ADD_TO_FAVORITES,
        data: results
    }
}

export function addFavorites(result){
    return async (dispatch, getState) => {
        try{
            let recent;
            recent = getState().search.favorites;
            let exists = recent.filter(x=>x===result);
            if(exists.length === 0) {
                recent.push(result);
                dispatch(addToFav(recent));
            }
        }
catch(e){
    console.log(e);
    console.log("Cannot add to Favorites");
   }
  }
}

export const CLEAR_SEARCH='CLEAR_SEARCH';
export function clearSearchDetails(){
    return{
        type: CLEAR_SEARCH,
        message: 'Search results cleared'
    }
}
