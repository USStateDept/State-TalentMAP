import { downloadFromResponse } from 'utilities';
import { batch } from 'react-redux';
import { get, identity, isArray, isEmpty, pickBy } from 'lodash';
import querystring from 'query-string';
import { CancelToken } from 'axios';
import { toastError } from './toast';
import api from '../api';

let cancel;


export function downloadBureauPositionsData(userQuery) {
  // eslint-disable-next-line no-console
  console.log('👾 current: userQuery', userQuery);
  if (get(userQuery, 'position__bureau__code__in', []).length < 1 && get(userQuery, 'position__org__code__in', []).length < 1) {
    return () => {
      // eslint-disable-next-line global-require
      require('../store').store.dispatch(toastError('Export unsuccessful. Please try again.', 'Error exporting'));
    };
  }
  const defaults = {
    limit: 99999999,
    page: 1,
  };
  const query = { ...userQuery, ...defaults };
  let q = pickBy(query, identity);
  Object.keys(q).forEach(queryk => { if (isArray(q[queryk])) { q[queryk] = q[queryk].join(); } });
  q = querystring.stringify(q);

  const url = `/fsbid/bureau/positions/export/?${q}`;
  // eslint-disable-next-line no-console
  console.log('👾 current: url', url);

  return api().get(url, {
    cancelToken: new CancelToken((c) => { cancel = c; }),
    responseType: 'stream',
  })
    .then((response) => {
      downloadFromResponse(response, 'TalentMap_bureau_positions_export');
    })
    .catch(() => {
      // eslint-disable-next-line global-require
      require('../store').store.dispatch(toastError('Export unsuccessful. Please try again.', 'Error exporting'));
    });
}

export function bureauPositionsHasErrored(bool) {
  return {
    type: 'BUREAU_POSITIONS_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function bureauPositionsIsLoading(bool) {
  return {
    type: 'BUREAU_POSITIONS_IS_LOADING',
    isLoading: bool,
  };
}

export function bureauPositionsFetchDataSuccess(results) {
  return {
    type: 'BUREAU_POSITIONS_FETCH_DATA_SUCCESS',
    results,
  };
}

export function bureauPositionsFetchData(userQuery, fromBureauMenu = true) {
  // Ensure the userQuery includes bureaus or orgs, based on menu
  // - otherwise we risk querying unauthorized positions
  if ((fromBureauMenu && isEmpty(get(userQuery, 'position__bureau__code__in', []))) ||
    (!fromBureauMenu && isEmpty(get(userQuery, 'position__org__code__in', [])))) {
    return (dispatch) => {
      batch(() => {
        dispatch(bureauPositionsHasErrored(true));
        dispatch(bureauPositionsIsLoading(false));
      });
    };
  }

  // Combine defaults with given userQuery
  let q = pickBy(userQuery, identity);
  Object.keys(q).forEach(queryk => { if (isArray(q[queryk])) { q[queryk] = q[queryk].join(); } });
  q = querystring.stringify(q);

  const url = `/fsbid/bureau/positions/?${q}`;

  return (dispatch) => {
    if (cancel) { cancel('cancel'); dispatch(bureauPositionsIsLoading(true)); }
    batch(() => {
      dispatch(bureauPositionsIsLoading(true));
      dispatch(bureauPositionsHasErrored(false));
    });

    api().get(url, {
      cancelToken: new CancelToken((c) => { cancel = c; }),
    })
      .then(({ data }) => {
        batch(() => {
          dispatch(bureauPositionsFetchDataSuccess(data));
          dispatch(bureauPositionsHasErrored(false));
          dispatch(bureauPositionsIsLoading(false));
        });
      })
      .catch((err) => {
        if (get(err, 'message') === 'cancel') {
          batch(() => {
            dispatch(bureauPositionsHasErrored(false));
            dispatch(bureauPositionsIsLoading(true));
          });
        } else {
          batch(() => {
            dispatch(bureauPositionsFetchDataSuccess({ results: [] }));
            dispatch(bureauPositionsHasErrored(true));
            dispatch(bureauPositionsIsLoading(false));
          });
        }
      });
  };
}

export function bureauUserSelectionsSaveSuccess(result) {
  return {
    type: 'BUREAU_SELECTIONS_SAVE_SUCCESS',
    result,
  };
}

export function saveBureauUserSelections(queryObject) {
  return (dispatch) => dispatch(bureauUserSelectionsSaveSuccess(queryObject));
}
