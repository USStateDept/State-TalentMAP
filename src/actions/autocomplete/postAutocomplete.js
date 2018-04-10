import { CancelToken } from 'axios';
import api from '../../api';

let cancel;

export function postSearchHasErrored(bool) {
  return {
    type: 'POST_SEARCH_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function postSearchIsLoading(bool) {
  return {
    type: 'POST_SEARCH_IS_LOADING',
    isLoading: bool,
  };
}

export function postSearchSuccess(posts) {
  return {
    type: 'POST_SEARCH_FETCH_DATA_SUCCESS',
    posts,
  };
}

export function postSearchFetchData(query) {
  return (dispatch) => {
    if (cancel) { cancel(); }
    dispatch(postSearchHasErrored(false));
    dispatch(postSearchIsLoading(true));
    api.get(`/orgpost/?q=${query}&limit=3`, {
      cancelToken: new CancelToken((c) => {
        cancel = c;
      }),
    })
    .then(({ data }) => {
      dispatch(postSearchIsLoading(false));
      let filteredResults = [];
      if (data.results) {
        // results should have a location
        filteredResults = data.results.filter(post => post.location.city !== null);
      }
      return filteredResults;
    })
    .then(results => dispatch(postSearchSuccess(results)))
    .catch(() => {
      dispatch(postSearchHasErrored(true));
      dispatch(postSearchIsLoading(false));
    });
  };
}
