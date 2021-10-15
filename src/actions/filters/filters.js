import { batch } from 'react-redux';
import { cloneDeep, get, isArray, keys, orderBy, union, uniqBy } from 'lodash';
import Q from 'q';
import api from '../../api';
import { ASYNC_PARAMS, ENDPOINT_PARAMS } from '../../Constants/EndpointParams';
import { mapDuplicates, removeDuplicates } from '../../utilities';
import { doesCodeOrIdMatch, getFilterCustomAttributes, getFilterCustomDescription,
  getPillDescription, getPostOrMissionDescription, isBooleanFilter, isPercentageFilter } from './helpers';

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
    batch(() => {
      dispatch(filtersIsLoading(true));
      dispatch(filtersHasErrored(false));
    });

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
        if (item.selectionRef === ENDPOINT_PARAMS.post
          || item.selectionRef === ENDPOINT_PARAMS.postAP) {
          dispatch(filtersIsLoading(true));
          const endpoint = '/fsbid/reference/locations/';
          return api().get(endpoint, {
            cache: {
              maxAge: 2 * 60 * 1000, // 2 min
              exclude: { query: false },
            },
          })
            .then((response) => {
            // TODO - this is dummy logic to get a single location,
            // since there is no fsbid endpoint to do so. Once that exists,
            // we can update this.
              const getAPLocation = () => {
                const obj = get(response, 'data', [])
                  .find(f => f.code === item.codeRef) || {};
                return {
                  id: obj.code,
                  location: {
                    ...obj,
                  },
                };
              };

              const results$ = getAPLocation();
              const obj = Object.assign(results$, { type: 'post', selectionRef: item.selectionRef, codeRef: item.codeRef });
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
              // for when they get put inside Pills
              if (item.codeRef === data.codeRef) {
                const description = getPostOrMissionDescription(data);
                const code = data.code;
                if (description) {
                  asyncFilters[i].description = description;
                  asyncFilters[i].code = code;
                }
              }
            });
          });
          // Add our async params to the original mappedParams
          // and remove and any duplicates by the 'description' prop.
          const responses$ = { ...responses };
          responses$.mappedParams.push(...responses$.asyncParams);
          // Get a unique identifier that won't be de-duplicated, by combining description and code.
          // This is most relevant for the duplicate "New York" post.
          responses$.mappedParams = responses$.mappedParams.map(m => ({ ...m, descCode: `${m.description}-${m.code}` }));
          // Remove duplicates by this new property
          responses$.mappedParams = removeDuplicates(
            responses$.mappedParams,
            ['descCode', 'isTandem'],
          );
          // Determine which objects duplicates by description,
          // and give them with a new prop to identify them
          responses$.mappedParams = mapDuplicates(responses$.mappedParams, 'description');
          // Add the code in parenetheses any duplicate descriptions.
          responses$.mappedParams = responses$.mappedParams.map((m) => {
            const m$ = { ...m };
            if (m.hasDuplicateDescription && m.code) {
              m$.description = `${m.description} (${m.code})`;
            }
            return m$;
          });
          // Finally, dispatch a success
          batch(() => {
            dispatch(filtersFetchDataSuccess(responses$));
            dispatch(filtersHasErrored(false));
            dispatch(filtersIsLoading(false));
          });
        })
        .catch(() => {
          batch(() => {
            dispatch(filtersHasErrored(true));
            dispatch(filtersIsLoading(false));
          });
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
          const customAttributes = getFilterCustomAttributes(filterItem, filterItemObject);
          if (customDescription) {
            responses.filters[i].data[j].custom_description = customDescription;
          }
          if (customAttributes) {
            responses.filters[i].data[j] = {
              ...responses.filters[i].data[j],
              ...customAttributes,
            };
          }
        });
      });

      // map any query params
      if (queryParamObject) {
        responses.filters.forEach((response) => {
          const filterRef = response.item.selectionRef;
          const isTandem = response.item.isTandem;
          const isCommon = response.item.isCommon;
          const isToggle = response.item.isToggle;
          Object.keys(queryParamObject).forEach((key) => {
            if (key === filterRef) {
              // convert the string to an array
              const paramArray = queryParamObject[key].split(',');
              paramArray.forEach((paramArrayItem) => {
                // create a base config object
                const mappedObject = {
                  selectionRef: filterRef,
                  codeRef: paramArrayItem,
                  isTandem,
                  isCommon,
                  isToggle,
                };
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
                        mappedObject.description =
                          getPillDescription(filterItemObject, response.item.description);
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

      // our dynamic filters
      const dynamicFilters = items.filters.slice().filter(item => (item.item.endpoint));
      const endpointResponses = {};

      const uniqueEndpoints = uniqBy(dynamicFilters, 'item.endpoint').map(m => m.item.endpoint);
      const uniqueFilters = uniqueEndpoints.map(m => api().get(`/${m}`, {
        cache: {
          maxAge: 2 * 60 * 1000, // 2 min
          exclude: { query: false },
        },
      }).then(res => {
        endpointResponses[m] = res;
        return res;
      })
        .catch(() => {
          endpointResponses[m] = { data: [], state: 'err' };
          return endpointResponses[m];
        }));

      Q.allSettled(uniqueFilters)
        .then((settledRes) => {
          settledRes.forEach((r, i) => {
            const keys$ = keys(endpointResponses);
            const property = keys$[i];
            endpointResponses[property].state = r.state;
          });
          const mappedDyanmicFilters = dynamicFilters.map(item => {
            const response = ({ ...endpointResponses[item.item.endpoint] });
            const itemFilter = Object.assign({}, item);
            itemFilter.state = response.state;
            const data$ = item.initialDataAP;
            let results$ = response.data.results;
            if (item.item.description === 'post') {
              results$ =
                get(response, 'data', [])
                  .map(m => ({
                    ...m,
                    id: m.code,
                    location: {
                      ...m,
                    },
                  }));
            }

            // We have a mix of server-supplied and hard-coded data, so we combine them with union.
            // Also determine whether the results array exists,
            // or if the array is passed at the top-level.
            if (results$) {
              itemFilter.data = union(results$, data$);
            } else if (isArray(response.data)) {
              itemFilter.data = union(response.data, data$);
            }

            // We handle skills differently depending on whether getUseAP === true,
            // and we override what ever was done in the union prior to this block.
            // Here we map the AP cone/code model to the old model so that it plays nice
            // with our existing components.
            if (item.item.description === 'skillCone') {
              const skills = [];
              itemFilter.data = response.data.map(m => ({ name: m.category, id: m.category }));
              itemFilter.data = orderBy(itemFilter.data, 'name');
              response.data.forEach((m) => {
                m.skills.forEach(s => skills.push({
                  ...s,
                  cone: m.category,
                }));
              });
              const skillObject = staticFilters.find(f => f.item.description === 'skill');
              skillObject.data = [...skills];
            }

            if (item.item.description === 'skillCone-tandem') {
              const skills = [];
              itemFilter.data = response.data.map(m => ({ name: m.category, id: m.category }));
              itemFilter.data = orderBy(itemFilter.data, 'name');
              response.data.forEach((m) => {
                m.skills.forEach(s => skills.push({
                  ...s,
                  cone: m.category,
                }));
              });
              const skillObject = staticFilters.find(f => f.item.description === 'skill-tandem');
              skillObject.data = [...skills];
            }

            return cloneDeep(itemFilter);
          });
          return mappedDyanmicFilters;
        })
        .then(results => {
          results.forEach((result) => {
            if (result.state === 'fulfilled' && get(result, 'data', []).length) {
            // if fulfilled, return the formatted data
              responses.filters.push({ data: get(result, 'data', []),
                item: get(result, 'item', {}) });
            } else {
            // Else, return the correct structure, but with no data. Include hasErrored prop.
              responses.filters.push({ data: [], item: {}, hasErrored: true });
            }
          });
          responses.filters.push(...staticFilters);
          dispatchSuccess();
          batch(() => {
            dispatch(filtersHasErrored(false));
            dispatch(filtersIsLoading(false));
          });
        });
    }
  };
}
