import { batch } from 'react-redux';
import { get } from 'lodash';
import { downloadFromResponse } from 'utilities';
import Q from 'q';
import { toastError } from './toast';
import api from '../api';

export function downloadPositionData(excludeAP = false, excludePV = false, isTandem = false) {
  const url = `/available_position${isTandem ? '/tandem/' : '/'}favorites/export/?exclude_available=${excludeAP}&exclude_projected=${excludePV}`;
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

// TO DO: EXPORT TANDEM POSITIONS

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
  page = 1, openPV) {
  return (dispatch) => {
    batch(() => {
      dispatch(favoritePositionsIsLoading(true));
      dispatch(favoritePositionsHasErrored(false));
    });
    let data$ = {
      counts: {},
    };
    const queryProms = [];

    const createUrl = (url) => {
      let url$ = url;
      if (sortType) {
        const append = `&ordering=${sortType}`;
        url$ += append;
      }
      return url$;
    };

    if (openPV === 'open' || openPV === 'all') {
      const url = createUrl(`/available_position/favorites/?limit=${limit}&page=${page}`);
      const fetchFavorites = () =>
        api().get(url)
          .then(({ data }) => data)
          .catch(error => error);
      queryProms.push(fetchFavorites());
    }

    if (openPV === 'openTandem' || openPV === 'all') {
      const urlTandem = createUrl(`/available_position/tandem/favorites/?limit=${limit}&page=${page}`);
      const fetchTandemFavorites = () =>
        api().get(urlTandem)
          .then(({ data }) => data)
          .catch(error => error);
      queryProms.push(fetchTandemFavorites());
    }

    if (openPV === 'pv' || openPV === 'all') {
      const urlPV = createUrl(`/projected_vacancy/favorites/?limit=${limit}&page=${page}`);
      const fetchPVFavorites = () =>
        api().get(urlPV)
          .then(({ data }) => data)
          .catch(error => error);
      queryProms.push(fetchPVFavorites());
    }

    if (openPV === 'pvTandem' || openPV === 'all') {
      const urlPVTandem = createUrl(`/projected_vacancy/tandem/favorites/?limit=${limit}&page=${page}`);
      const fetchTandemPVFavorites = () =>
        api().get(urlPVTandem)
          .then(({ data }) => data)
          .catch(error => error);
      queryProms.push(fetchTandemPVFavorites());
    }

    Q.allSettled(queryProms)
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
          if (openPV === 'open') {
            data$.favorites = get(results, '[0].value.results', []);
            data$.counts.favorites = get(results, '[0].value.count', 0);
          } else if (openPV === 'openTandem') {
            data$.favoritesTandem = get(results, '[0].value.results', 0);
            data$.counts.favoritesTandem = get(results, '[0].value.count', 0);
          } else if (openPV === 'pv') {
            data$.favoritesPV = get(results, '[0].value.results', []).map(m => ({ ...m, isPV: true }));
            data$.counts.favoritesPV = get(results, '[0].value.count', 0);
          } else if (openPV === 'pvTandem') {
            data$.favoritesPVTandem = get(results, '[0].value.results', []).map(m => ({ ...m, isPV: true }));
            data$.counts.favoritesPVTandem = get(results, '[0].value.count', 0);
          } else {
            data$ = {
              favorites: [],
              favoritesPV: [],
              favoritesTandem: [],
              favoritesPVTandem: [],
              counts: {},
            };
            // MUST TO DO: Check object index
            data$.counts.favorites = get(results, '[0].value.count', 0);
            data$.counts.favoritesTandem = get(results, '[1].value.count', 0);
            data$.counts.favoritesPV = get(results, '[2].value.count', 0);
            data$.counts.favoritesPVTandem = get(results, '[3].value.count', 0);
            data$.favorites = get(results, '[0].value.results', []);
            data$.favoritesTandem = get(results, '[1].value.results', []);
            data$.favoritesPV = get(results, '[2].value.results', []).map(m => ({ ...m, isPV: true }));
            data$.favoritesPVTandem = get(results, '[3].value.results', []).map(m => ({ ...m, isPV: true }));
            data$.results = get(results, '[0].value.results', []); // TODO: outdated? consider removing
          }
          data$.counts.all = data$.counts.favorites + data$.counts.favoritesTandem +
            data$.counts.favoritesPV + data$.counts.favoritesPVTandem;
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
