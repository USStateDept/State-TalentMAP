import api from '../api';

export function postHasErrored(bool) {
  return {
    type: 'POST_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function postIsLoading(bool) {
  return {
    type: 'POST_IS_LOADING',
    isLoading: bool,
  };
}

export function postFetchDataSuccess(post) {
  return {
    type: 'POST_FETCH_DATA_SUCCESS',
    post,
  };
}

export function postFetchData(query) {
  return (dispatch) => {
    dispatch(postIsLoading(true));
    api.get(`/orgpost/${query}/`)
      .then((response) => {
        dispatch(postIsLoading(false));
        return response.data;
      })
      .then(post => dispatch(postFetchDataSuccess(post)))
      .catch(() => dispatch(postHasErrored(true)));
  };
}
