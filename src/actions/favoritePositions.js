import { batch } from 'react-redux';
import { get, isNil } from 'lodash';
import { downloadFromResponse } from 'utilities';
import { toastError } from './toast';
import api from '../api';

export function downloadPositionData(excludeAP = false, excludePV = false) {
  const url = `/available_position/favorites/export/?exclude_available=${excludeAP}&exclude_projected=${excludePV}`;
  return api().get(url, {
    responseType: 'stream',
  })
    .then((response) => {
      downloadFromResponse(response, 'TalentMap_favorites_export');
    })
    .catch(() => {
    // eslint-disable-next-line global-require
      require('../store').store.dispatch(toastError('Export unsuccessful. Please try again.', 'Error exporting'));
    });
}

export function favoritePositionsHasErrored(bool) {
  return {
    type: 'FAVORITE_POSITIONS_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function favoritePositionsIsLoading(bool) {
  return {
    type: 'FAVORITE_POSITIONS_IS_LOADING',
    isLoading: bool,
  };
}

export function favoritePositionsFetchDataSuccess(results) {
  return {
    type: 'FAVORITE_POSITIONS_FETCH_DATA_SUCCESS',
    results,
  };
}

export function favoritePositionsFetchData(sortType, limit = 15,
  page = 1, openPV, favoritePositions) {
  return (dispatch) => {
    batch(() => {
      dispatch(favoritePositionsIsLoading(true));
      dispatch(favoritePositionsHasErrored(false));
    });
    let data$ = {};
    const queryProms = [];
    let countsInitial = false;
    if (!isNil(favoritePositions)) {
      countsInitial = Array.isArray(favoritePositions.counts);
    }

    if (openPV === 'open' || isNil(openPV) || countsInitial) {
      let url = `/available_position/favorites/?limit=${limit}&page=${page}`;
      if (sortType) {
        const append = `&ordering=${sortType}`;
        url += append;
      }
      const fetchFavorites = () =>
        api().get(url)
          .then(({ data }) => data)
          .catch(error => error);
      queryProms.push(fetchFavorites());
    }
    if (openPV === 'pv' || isNil(openPV) || countsInitial) {
      let urlPV = `/projected_vacancy/favorites/?limit=${limit}&page=${page}`;
      if (sortType) {
        const append = `&ordering=${sortType}`;
        urlPV += append;
      }
      const fetchPVFavorites = () =>
        api().get(urlPV)
          .then(({ data }) => data)
          .catch(error => error);
      queryProms.push(fetchPVFavorites());
    }
    Promise.all(queryProms)
      .then((results) => {
      // if any promise returned with errors, return the error
        let err;
        results.forEach((result) => {
          if (result instanceof Error) {
            err = result;
          }
        });
        if (err) {
          batch(() => {
            dispatch(favoritePositionsHasErrored(true));
            dispatch(favoritePositionsIsLoading(false));
          });
        } else {
          if (openPV === 'open' && !countsInitial) {
            data$.favorites = get(results, '[0].results', []);
          } else if (openPV === 'pv' && !countsInitial) {
            data$.favoritesPV = get(results, '[0].results', []).map(m => ({ ...m, isPV: true }));
          } else {
            data$ = {
              favorites: [],
              favoritesPV: [],
              counts: {
                favorites: 0,
                favoritesPV: 0,
                all: 0,
              },
            };
            // object 0 is favorites if both calls made
            data$.counts.favorites = get(results, '[0].count', 0);
            data$.counts.favoritesPV = get(results, '[1].count', 0);
            data$.counts.all = get(results, '[0].count', 0) + get(results, '[1].count', 0);
            data$.favorites = get(results, '[0].results', []);
            // object 1 is PV favorites if both calls made
            data$.favoritesPV = get(results, '[1].results', []).map(m => ({ ...m, isPV: true }));
            data$.results = get(results, '[0].results', []); // TODO: outdated? consider removing
          }
          batch(() => {
            dispatch(favoritePositionsFetchDataSuccess(data$));
            dispatch(favoritePositionsHasErrored(false));
            dispatch(favoritePositionsIsLoading(false));
          });
        }
      })
      .catch(() => {
        batch(() => {
          dispatch(favoritePositionsHasErrored(true));
          dispatch(favoritePositionsIsLoading(false));
        });
      });
  };
}
