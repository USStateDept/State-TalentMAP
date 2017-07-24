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

export function filtersFetchData(api, items) {
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
      axios.get(`${api}/${item.item.endpoint}`)
              .then((response) => {
                const itemFilter = item;
                itemFilter.data = response.data;
                responses.push({ data: response.data, item: itemFilter.item });
                dispatchSuccess();
              })
              .catch(() => dispatch(filtersHasErrored(true)));
    });
  };
}
