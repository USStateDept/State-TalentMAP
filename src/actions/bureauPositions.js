import { batch } from 'react-redux';
import { downloadFromResponse } from 'utilities';
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


export function bureauPositionsFetchData(sortType, limit = 25, page = 1, q = '') {
  return (dispatch) => {
    batch(() => {
      dispatch(bureauPositionsIsLoading(true));
      dispatch(bureauPositionsHasErrored(false));
    });

    const createUrl = (url) => {
      let url$ = url;
      if (sortType) {
        const append = `&ordering=${sortType}`;
        url$ += append;
      }
      return url$;
    };

    const url = createUrl(`/fsbid/bureau/positions/?limit=${limit}&page=${page}&q=${q}`);

    api().get(url)
      .then(({ data }) => {
        dispatch(bureauPositionsHasErrored(false));
        dispatch(bureauPositions(data));
        dispatch(bureauPositionsIsLoading(false));
      })
      .catch(() => {
        batch(() => {
          dispatch(bureauPositionsHasErrored(true));
          dispatch(bureauPositionsIsLoading(false));
        });
      });
  };
}
