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

export function filtersFetchData(items, queryParams, savedResponses) {
  return (dispatch) => {
    dispatch(filtersIsLoading(true));

    const queryParamObject = queryParams;

    // "mappedParams" allow us to map filters to query params.
    // Since query params come in with no "extra" data, we have
    // to map them back to the original filters from the API
    // in order to supplement them with human-readable data.
    // "filters" will store our selectable filters.
    const responses = savedResponses
      || { mappedParams: [], filters: [], hasFetched: false };

    function dispatchSuccess() {
      // check if we've gotten all the filters we asked for
      if (responses.filters.length === items.filters.length) {
        // Set all of our isSelected values back to false.
        // We'll check if they should be set to true later
        responses.filters.forEach((responseFilter, i) => {
          responseFilter.data.forEach((responseFilterData, ii) => {
            responses.filters[i].data[ii].isSelected = false;
          });
        });
        // check for option queryParamObject to map against (used for pill filters)
        responses.mappedParams = [];
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
                  responses.filters.forEach((filterItem, i) => {
                    filterItem.data.forEach((filterItemObject, ii) => {
                      if (filterItemObject.code.toString() === mappedObject.codeRef.toString() &&
                          filterItem.item.selectionRef === mappedObject.selectionRef) {
                        responses.filters[i].data[ii].isSelected = true;
                        if ( // boolean filters are special since they don't rely on AJAX
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
        // set the hasFetched property so that our component knows when
        // to avoid an AJAX refresh
        responses.hasFetched = true;
        // finally, dispatch a success
        dispatch(filtersHasErrored(false));
        dispatch(filtersIsLoading(false));
        dispatch(filtersFetchDataSuccess(responses));
      }
    }

    // If saved responses are returned, don't run AJAX.
    // This way, we can map any new query params without
    // needlessly refreshing the filters via AJAX.
    if (savedResponses) {
      dispatchSuccess();
    } else {
      dispatch(filtersHasErrored(false));
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
    }
  };
}
