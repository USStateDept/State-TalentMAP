import { batch } from 'react-redux';
import { downloadFromResponse } from 'utilities';
import { toastError } from './toast';
import api from '../api';

// eslint-disable-next-line import/prefer-default-export
export function downloadBidderData() {
  // exporting the 'bureau positions'. Just setting up the framework
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

export function bureauPositions(results) {
  return {
    type: 'BUREAU_POSITIONS_FETCH_DATA_SUCCESS',
    results,
  };
}


export function bureauPositionsFetchData() {
  return (dispatch) => {
    dispatch(bureauPositionsIsLoading(true));
    const url = '/fsbid/bureau/positions/';
    api().get(url)
      .then(({ data }) => {
        dispatch(bureauPositionsIsLoading(false));
        dispatch(bureauPositionsHasErrored(false));
        dispatch(bureauPositions(data));
      })
      .catch(() => {
        batch(() => {
          dispatch(bureauPositionsIsLoading(false));
          dispatch(bureauPositionsHasErrored(true));
        });
      });
  };
}
