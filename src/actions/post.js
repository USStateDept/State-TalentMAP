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
              dispatch(postIsLoading(false));
              return response.data;
            })
            .then(post => dispatch(postFetchDataSuccess(post)))
            .catch(() => dispatch(postHasErrored(true)));
  };
}
