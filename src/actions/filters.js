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

export function filtersFetchData(items, queryParams) {
  return (dispatch) => {
    dispatch(filtersIsLoading(true));

    const queryParamObject = queryParams;

    // "mappedParams" allow us to map filters to query params.
    // Since query params come in with no "extra" data, we have
    // to map them back to the original filters from the API
    // in order to supplement them with human-readable data.
    // "filters" will store our selectable filters.
    const responses = { mappedParams: [], filters: [] };

    function dispatchSuccess() {
      // check if we've gotten all the filters we asked for
      if (responses.filters.length === items.filters.length) {
        // check for option queryParamObject to map against (used for pill filters)
        if (queryParamObject) {
          responses.filters.forEach((response) => {
            const filterRef = response.item.selectionRef;
            Object.keys(queryParamObject).forEach((key) => {
              if (key === filterRef) {
                // convert the string to an array
                const paramArray = queryParamObject[key].split(',');
                paramArray.forEach((paramArrayItem) => {
                  // create a base config object
                  const mappedObject = {
                    selectionRef: filterRef,
                    codeRef: paramArrayItem,
                  };
                  responses.filters.forEach((filterItem) => {
                    filterItem.data.forEach((filterItemObject) => {
                      if (filterItemObject.code === mappedObject.codeRef) {
                        // handle boolean filters a little differently
                        // we want to show the title in the pill, not the value
                        if (
                          response.item.title === 'COLA' ||
                          response.item.title === 'Post Differential' ||
                          response.item.title === 'Danger pay' ||
                          response.item.title === 'Domestic'
                        ) {
                          mappedObject.description = response.item.title;
                        } else {
                          // try to get the shortest description since pills should be small
                          mappedObject.description =
                            filterItemObject.short_description ||
                            filterItemObject.description ||
                            filterItemObject.long_description ||
                            filterItemObject.code;
                        }
                      }
                    });
                  });
                  // push our formed object to the mappedParams array
                  responses.mappedParams.push(mappedObject);
                });
              }
            });
          });
        }
        // finally, dispatch a success
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
