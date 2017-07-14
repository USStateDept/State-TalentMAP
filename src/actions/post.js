import axios from 'axios';

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

export function postFetchData(url) {
  return (dispatch) => {
    dispatch(postIsLoading(true));
    axios.get(url)
            .then((response) => {
              if (response.statusText === 'OK' || response.status === 200) {
                dispatch(postIsLoading(false));
                return response.data;
              }
              throw Error(response.statusText);
            })
            .then(post => dispatch(postFetchDataSuccess(post)))
            .catch(() => dispatch(postHasErrored(true)));
  };
}
