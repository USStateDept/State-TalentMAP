import { downloadFromResponse } from 'utilities';
import { batch } from 'react-redux';
import { get } from 'lodash';
import querystring from 'query-string';
import { toastError } from './toast';
import api from '../api';

// eslint-disable-next-line import/prefer-default-export
export function downloadBidderData() {
// export function downloadBidderData(id) {
  // const url = createUrl(`/fsbid/bureau/positions/${id}/bidders/export/`);
  // exporting the 'bureau positions'. Just setting up the framework, for now.
  const url = '/fsbid/bureau/positions/export/';
  return api().get(url, {
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

export function downloadBureauPositionsData(userQuery) {
  if (get(userQuery, 'position__bureau__code__in', []).length < 1) {
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
  const q = querystring.stringify(query,
    {
      arrayFormat: 'comma',
      skipNull: true,
    },
  );

  const url = `/fsbid/bureau/positions/export/?${q}`;
  return api().get(url, {
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


export function bureauPositionsFetchData(userQuery) {
  // Ensure the userQuery includes a bureau - otherwise we risk querying unauthorized positions
  if (get(userQuery, 'position__bureau__code__in', []).length < 1) {
    return (dispatch) => {
      batch(() => {
        dispatch(bureauPositionsHasErrored(true));
        dispatch(bureauPositionsIsLoading(false));
      });
    };
  }
  // Default pagination - may be redundant with default state defined in hooks
  const defaults = {
    limit: 25,
    page: 1,
    ordering: '',
  };
  // Combine defaults with given userQuery
  const query = { ...defaults, ...userQuery };
  const q = querystring.stringify(query,
    {
      arrayFormat: 'comma',
      skipNull: true,
    },
  );

  const url = `/fsbid/bureau/positions/?${q}`;

  return (dispatch) => {
    batch(() => {
      dispatch(bureauPositionsIsLoading(true));
      dispatch(bureauPositionsHasErrored(false));
    });

    api().get(url)
      .then(({ data }) => {
        batch(() => {
          dispatch(bureauPositionsFetchDataSuccess(data));
          dispatch(bureauPositionsHasErrored(false));
          dispatch(bureauPositionsIsLoading(false));
        });
      })
      .catch(() => {
        batch(() => {
          dispatch(bureauPositionsHasErrored(true));
          dispatch(bureauPositionsIsLoading(false));
        });
      });
  };
}
