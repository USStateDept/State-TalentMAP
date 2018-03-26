import api from '../../api';
import { ASYNC_PARAMS, ENDPOINT_PARAMS } from '../../Constants/EndpointParams';
import { removeDuplicates } from '../../utilities';
import { getFilterCustomDescription, getPillDescription, getPostOrMissionDescription,
  doesCodeOrIdMatch, isBooleanFilter, isPercentageFilter } from './helpers';

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

export function filtersFetchData(items = { filters: [] }, queryParams = {}, savedResponses,
  fromResultsPage = false) {
  return (dispatch) => {
    dispatch(filtersIsLoading(true));
    dispatch(filtersHasErrored(false));

    const queryParamObject = queryParams;

    // "mappedParams" allow us to map filters to query params.
    // Since query params come in with no "extra" data, we have
    // to map them back to the original filters from the API
    // in order to supplement them with human-readable data.
    // "filters" will store our selectable filters.
    const responses = savedResponses
      || {
        mappedParams: [],
        asyncParams: [],
        filters: [],
        hasFetched: false,
        asyncFilterCache: [],
      };

    // Map our props that are retrieved on the fly and don't have
    // anything to reference against (posts and missions).
    // We could easily check the originating param (selectionRef)
    // and perform any custom, conditional labeling.
    // TODO we should verify these against VALID_PARAMS.
    function mapAsyncParams() {
      const asyncFilters = responses.asyncParams || [];

      // create a promise to retrieve our filters that rely on ajax
      const asyncQueryProms = asyncFilters.map((item) => {
        let cacheFound = false;
        // check our cache to see if we already have data saved on the filter
        responses.asyncFilterCache.forEach((a) => {
          // check that the ID and source match
          if (a.codeRef === item.codeRef && a.selectionRef === item.selectionRef) {
            cacheFound = a;
          }
        });
        // Is it already cached? if so, return it.
        if (cacheFound) {
          return cacheFound;
        // Else, we'll want to retrieve it.
        // We'll do this for posts and missions.
        }
        if (item.selectionRef === ENDPOINT_PARAMS.post) {
          dispatch(filtersIsLoading(true));
          return api.get(`/orgpost/${item.codeRef}/`)
          .then((response) => {
            const obj = Object.assign(response.data, { type: 'post', selectionRef: item.selectionRef, codeRef: item.codeRef });
            // push the object to cache
            responses.asyncFilterCache.push(obj);
            // and return the object
            return obj;
          })
          .catch((error) => {
            throw error;
          });
        }
        return {};
      });

      const asyncData = [];

      // actually execute our async calls
      Promise.all(asyncQueryProms)
        // Promise.all returns a single array which matches the order of the originating array
        .then((results) => {
          results.forEach((result) => {
            asyncData.push(result);
          });
        })
        .then(() => {
          asyncFilters.forEach((item, i) => {
            asyncData.forEach((data) => {
              // Do some formatting for post and mission data
              // for when they get put inside Pills/
              if (item.codeRef === data.codeRef) {
                const description = getPostOrMissionDescription(data);
                if (description) {
                  asyncFilters[i].description = description;
                }
              }
            });
          });
          // Add our async params to the original mappedParams
          // and remove and any duplicates by the 'description' prop.
          responses.mappedParams.push(...responses.asyncParams);
          responses.mappedParams = removeDuplicates(responses.mappedParams, 'description');
          // Finally, dispatch a success
          dispatch(filtersFetchDataSuccess(responses));
          dispatch(filtersHasErrored(false));
          dispatch(filtersIsLoading(false));
        })
        .catch(() => {
          dispatch(filtersHasErrored(true));
          dispatch(filtersIsLoading(false));
        });
    }

    function dispatchSuccess() {
      // Set all of our isSelected values back to false.
      // We'll check if they should be set to true later
      responses.filters.forEach((responseFilter, i) => {
        responseFilter.data.forEach((responseFilterData, j) => {
          responses.filters[i].data[j].isSelected = false;
        });
      });
      // check for option queryParamObject to map against (used for pill filters)

      // Only clear the params if we're on the Results page
      if (fromResultsPage) {
        responses.mappedParams = [];
        responses.asyncParams = [];
      }

      // Set any custom descriptions
      // TODO externalize these to some kind of template helper?
      responses.filters.forEach((filterItem, i) => {
        filterItem.data.forEach((filterItemObject, j) => {
          const customDescription = getFilterCustomDescription(filterItem, filterItemObject);
          if (customDescription) {
            responses.filters[i].data[j].custom_description = customDescription;
          }
        });
      });

      // map any query params
      if (queryParamObject) {
        responses.filters.forEach((response) => {
          const filterRef = response.item.selectionRef;
          Object.keys(queryParamObject).forEach((key) => {
            if (key === filterRef) {
              // convert the string to an array
              const paramArray = queryParamObject[key].split(',');
              paramArray.forEach((paramArrayItem) => {
                // create a base config object
                const mappedObject = { selectionRef: filterRef, codeRef: paramArrayItem };
                responses.filters.forEach((filterItem, i) => {
                  filterItem.data.forEach((filterItemObject, j) => {
                    // Check if code or ID matches, since we use both.
                    // TODO - consider standardizing to ID?
                    if (doesCodeOrIdMatch(filterItem, filterItemObject, mappedObject)) {
                      responses.filters[i].data[j].isSelected = true;
                      // boolean filters are special since they don't rely on AJAX
                      if (isBooleanFilter(response.item.description)) {
                        mappedObject.description = response.item.title;
                      } else if (isPercentageFilter(response.item.description)) {
                        mappedObject.description =
                          getPillDescription(filterItemObject, response.item.description);
                      } else {
                        // try to get the shortest description since pills should be small
                        mappedObject.description = getPillDescription(filterItemObject);
                      }
                    }
                  });
                });
                // push our formed object to the mappedParams array
                if (ASYNC_PARAMS.indexOf(mappedObject.selectionRef) > -1) {
                  responses.asyncParams.push(mappedObject);
                } else {
                  if (!responses.mappedParams) { responses.mappedParams = []; }
                  responses.mappedParams.push(mappedObject);
                }
              });
            }
          });
        });
      }
      // set the hasFetched property so that our component knows when
      // to avoid an AJAX refresh
      responses.hasFetched = true;
      // add any arbitrary filters
      mapAsyncParams();
    }

    // If saved responses are returned, don't run AJAX.
    // This way, we can map any new query params without
    // needlessly refreshing the filters via AJAX.
    if (savedResponses) {
      // we still need to map any new arbitrary filters that were added
      dispatchSuccess();
    } else {
      // our static filters
      const staticFilters = items.filters.slice().filter(item => (!item.item.endpoint));
      responses.filters.push(...staticFilters);

      // our dynamic filters
      const dynamicFilters = items.filters.slice().filter(item => (item.item.endpoint));
      const queryProms = dynamicFilters.map(item => (
        api.get(`/${item.item.endpoint}`)
          .then((response) => {
            const itemFilter = Object.assign({}, item);
            itemFilter.data = response.data.results;
            return itemFilter;
          })
      ),
      );

      Promise.all(queryProms)
        // Promise.all returns a single array which matches the order of the originating array
        .then((results) => {
          results.forEach((result) => {
            responses.filters.push({ data: result.data, item: result.item });
          });
          dispatchSuccess();
        })
        .catch(() => {
          dispatch(filtersHasErrored(true));
          dispatch(filtersIsLoading(false));
        });
    }
  };
}
