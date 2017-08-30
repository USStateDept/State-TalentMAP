import axios from 'axios';
import api from '../api';

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

export function filtersFetchData(items) {
  return (dispatch) => {
    dispatch(filtersIsLoading(true));

    const responses = [];

    function dispatchSuccess() {
      if (responses.length === items.length) {
        dispatch(filtersIsLoading(false));
        dispatch(filtersFetchDataSuccess(responses));
      }
    }

    items.forEach((item) => {
      // check for filters that don't need to be requested from the API
      if (!item.item.endpoint) {
        responses.push(item);
      } else { // get filters that have an associated endpoint
        axios.get(`${api}/${item.item.endpoint}`)
              .then((response) => {
                const itemFilter = item;
                itemFilter.data = response.data.results;
                responses.push({ data: response.data.results, item: itemFilter.item });
                dispatchSuccess();
              })
              .catch(() => dispatch(filtersHasErrored(true)));
      }
    });
  };
}
