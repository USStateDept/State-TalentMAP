import axios from 'axios';

export function filtersHasErrored(bool) {
  return {
    type: 'FILTERS_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function filtersIsLoading(bool) {
  return {
    type: 'FILTERS_IS_LOADING',
    isLoading: bool,
  };
}
export function filtersFetchDataSuccess(filters) {
  return {
    type: 'FILTERS_FETCH_DATA_SUCCESS',
    filters,
  };
}

export function filtersFetchData(urlArr) {
  return (dispatch) => {
    dispatch(filtersIsLoading(true));

    const responses = [];

    function dispatchSuccess() {
      if (responses.length === urlArr.length) {
        dispatch(filtersIsLoading(false));
        dispatch(filtersFetchDataSuccess(responses));
      }
    }

    urlArr.forEach((url) => {
      axios.get(url.url)
              .then((response) => {
                if (response.statusText === 'OK' || response.status === 200) {
                  responses.push({ data: response.data, item: url.item });
                  dispatchSuccess();
                }
                throw Error(response.statusText);
              })
              .catch(() => dispatch(filtersHasErrored(true)));
    });
  };
}
