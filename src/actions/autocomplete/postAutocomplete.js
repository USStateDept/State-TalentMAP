import axios, { CancelToken } from 'axios';
import api from '../../api';

// const CancelToken = axios.CancelToken;
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
    axios.get(`${api}/orgpost/?q=${query}&limit=3`, {
      cancelToken: new CancelToken((c) => {
        cancel = c;
      }),
    },
    )
      .then((response) => {
        dispatch(postSearchIsLoading(false));
        return response.data.results;
      })
      .then(results => dispatch(postSearchSuccess(results)))
      .catch(() => {
        dispatch(postSearchHasErrored(true));
        dispatch(postSearchIsLoading(false));
      });
  };
}
