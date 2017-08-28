import axios from 'axios';
// import queryString from 'query-string';
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

export function filtersFetchData(items, queryParams) {
  return (dispatch) => {
    dispatch(filtersIsLoading(true));

    const queryParamObject = queryParams;

    const responses = { mappedParams: [], filters: [] };

    function dispatchSuccess() {
      if (responses.filters.length === items.filters.length) {
        if (queryParamObject) {
          responses.filters.forEach((response) => {
            const filterRef = response.item.selectionRef;
            Object.keys(queryParamObject).forEach((key) => {
              if (key === filterRef) {
                const paramArray = queryParamObject[key].split(',');
                paramArray.forEach((paramArrayItem) => {
                  const mappedObject = {
                    selectionRef: filterRef,
                    codeRef: paramArrayItem,
                  };
                  responses.filters.forEach((filterItem) => {
                    filterItem.data.forEach((filterItemObject) => {
                      if (filterItemObject.code === mappedObject.codeRef) {
                        if (
                          response.item.title === 'COLA' ||
                          response.item.title === 'Post Differential' ||
                          response.item.title === 'Danger pay' ||
                          response.item.title === 'Domestic'
                        ) {
                          mappedObject.description = response.item.title;
                        } else {
                          mappedObject.description =
                            filterItemObject.short_description ||
                            filterItemObject.description ||
                            filterItemObject.long_description;
                        }
                      }
                    });
                  });
                  responses.mappedParams.push(mappedObject);
                });
              }
            });
          });
        }
        dispatch(filtersIsLoading(false));
        dispatch(filtersFetchDataSuccess(responses));
      }
    }

    items.filters.forEach((item) => {
      // check for filters that don't need to be requested from the API
      if (!item.item.endpoint) {
        responses.filters.push(item);
      } else { // get filters that have an associated endpoint
        axios.get(`${api}/${item.item.endpoint}`)
              .then((response) => {
                const itemFilter = Object.assign({}, item);
                itemFilter.data = response.data.results;
                responses.filters.push({ data: response.data.results, item: itemFilter.item });
                dispatchSuccess();
              })
              .catch(() => dispatch(filtersHasErrored(true)));
      }
    });
  };
}
