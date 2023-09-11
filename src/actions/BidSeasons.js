import { batch } from 'react-redux';
import { CancelToken } from 'axios';
import {
  ADD_BID_SEASON_ERROR,
  ADD_BID_SEASON_ERROR_TITLE,
  ADD_BID_SEASON_SUCCESS,
  ADD_BID_SEASON_SUCCESS_TITLE,
  EDIT_BID_SEASON_ERROR,
  EDIT_BID_SEASON_ERROR_TITLE,
  EDIT_BID_SEASON_SUCCESS,
  EDIT_BID_SEASON_SUCCESS_TITLE,
} from 'Constants/SystemMessages';
import api from '../api';
import { toastError, toastSuccess } from './toast';
// import { convertQueryToString } from 'utilities';


export function bidSeasonsFetchDataErrored(bool) {
  return {
    type: 'BID_SEASON_FETCH_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function bidSeasonsFetchDataLoading(bool) {
  return {
    type: 'BID_SEASON_FETCH_IS_LOADING',
    isLoading: bool,
  };
}

export function bidSeasonsFetchDataSuccess(results) {
  return {
    type: 'BID_SEASONS_FETCH_SUCCESS',
    results,
  };
}


let cancel;


export function bidSeasonsFetchData() {
  return (dispatch) => {
    if (cancel) { cancel('cancel'); }
    batch(() => {
      dispatch(bidSeasonsFetchDataLoading(true));
      dispatch(bidSeasonsFetchDataErrored(false));
    });
    dispatch(bidSeasonsFetchDataLoading(true));
    const endpoint = 'fsbid/manage_bid_seasons/';
    api().get(endpoint)
      .then(({ data }) => {
        batch(() => {
          dispatch(bidSeasonsFetchDataSuccess(data));
          dispatch(bidSeasonsFetchDataErrored(false));
          dispatch(bidSeasonsFetchDataLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(bidSeasonsFetchDataLoading(true));
            dispatch(bidSeasonsFetchDataErrored(false));
          });
        } else {
          batch(() => {
            dispatch(bidSeasonsFetchDataSuccess([]));
            dispatch(bidSeasonsFetchDataErrored(false));
            dispatch(bidSeasonsFetchDataLoading(false));
          });
        }
      });
  };
}

export function bidSeasonsSelectionsSaveSuccess(result) {
  return {
    type: 'BID_SEASON_SELECTIONS_SAVE_SUCCESS',
    result,
  };
}

export function saveBidSeasonsSelections(queryObject) {
  return (dispatch) => dispatch(bidSeasonsSelectionsSaveSuccess(queryObject));
}


// // DROP
// export function bidSeasonsPositionSearchFetchDataErrored(bool) {
//   return {
//     type: 'BID_SEASON_POSITION_SEARCH_FETCH_HAS_ERRORED',
//     hasErrored: bool,
//   };
// }

// export function bidSeasonsPositionSearchFetchDataLoading(bool) {
//   return {
//     type: 'BID_SEASON_POSITION_SEARCH_FETCH_IS_LOADING',
//     isLoading: bool,
//   };
// }

// export function bidSeasonsPositionSearchFetchDataSuccess(results) {
//   return {
//     type: 'BID_SEASON_POSITION_SEARCH_FETCH_SUCCESS',
//     results,
//   };
// }


// export function bidSeasonsPositionSearchFetchData() {
//   return (dispatch) => {
//     batch(() => {
//       dispatch(bidSeasonsPositionSearchFetchDataLoading(true));
//       dispatch(bidSeasonsPositionSearchFetchDataErrored(false));
//     });
//     dispatch(bidSeasonsPositionSearchFetchDataLoading(true));
//     const endpoint = 'fsbid/manage_bid_seasons/';
//     api().get(endpoint)
//       .then(({ data }) => {
//         batch(() => {
//           dispatch(bidSeasonsPositionSearchFetchDataSuccess(data));
//           dispatch(bidSeasonsPositionSearchFetchDataErrored(false));
//           dispatch(bidSeasonsPositionSearchFetchDataLoading(false));
//         });
//       })
//       .catch((err) => {
//         if (err?.message === 'cancel') {
//           batch(() => {
//             dispatch(bidSeasonsPositionSearchFetchDataLoading(true));
//             dispatch(bidSeasonsPositionSearchFetchDataErrored(false));
//           });
//         } else {
//           batch(() => {
//             dispatch(bidSeasonsPositionSearchFetchDataErrored(true));
//             dispatch(bidSeasonsPositionSearchFetchDataLoading(false));
//           });
//         }
//       });
//   };
// }


// export function bidSeasonsPositionSearchSelectionsSaveSuccess(result) {
//   return {
//     type: 'BID_SEASON_POSITION_SEARCH_SELECTIONS_SAVE_SUCCESS',
//     result,
//   };
// }

// export function saveBidSeasonsPositionSearchSelections(queryObject) {
//   return (dispatch) => dispatch(bidSeasonsPositionSearchSelectionsSaveSuccess(queryObject));
// }
// // DROP ^^


export function bidSeasonsPositionRemoveHasErrored(bool) {
  return {
    type: 'BID_SEASON_POSITION_REMOVE_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function bidSeasonsPositionRemoveIsLoading(bool) {
  return {
    type: 'BID_SEASON_POSITION_REMOVE_IS_LOADING',
    isLoading: bool,
  };
}
export function bidSeasonsPositionRemoveSuccess(data) {
  return {
    type: 'BID_SEASON_POSITION_REMOVE_SUCCESS',
    data,
  };
}

export function bidSeasonsPositionRemove(position) {
  return (dispatch) => {
    if (cancel) { cancel('cancel'); }
    dispatch(bidSeasonsPositionRemoveIsLoading(true));
    dispatch(bidSeasonsPositionRemoveHasErrored(false));
    api()
      .post('/placeholder/POST/endpoint', {
        position,
      }, {
        cancelToken: new CancelToken((c) => {
          cancel = c;
        }),
      })
      .then(({ data }) => {
        batch(() => {
          dispatch(bidSeasonsPositionRemoveHasErrored(false));
          dispatch(bidSeasonsPositionRemoveSuccess(data || []));
          dispatch(
            toastSuccess(ADD_BID_SEASON_SUCCESS,
              ADD_BID_SEASON_SUCCESS_TITLE));
          dispatch(bidSeasonsPositionRemoveIsLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          dispatch(bidSeasonsPositionRemoveHasErrored(false));
          dispatch(bidSeasonsPositionRemoveIsLoading(false));
        } else {
          dispatch(toastError(ADD_BID_SEASON_ERROR,
            ADD_BID_SEASON_ERROR_TITLE));
          dispatch(bidSeasonsPositionRemoveHasErrored(true));
          dispatch(bidSeasonsPositionRemoveIsLoading(false));
        }
      });
  };
}

export function bidSeasonsPositionEditHasErrored(bool) {
  return {
    type: 'BID_SEASON_POSITION_EDIT_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function bidSeasonsPositionEditIsLoading(bool) {
  return {
    type: 'BID_SEASON_POSITION_EDIT_IS_LOADING',
    isLoading: bool,
  };
}
export function bidSeasonsPositionEditSuccess(data) {
  return {
    type: 'BID_SEASON_POSITION_EDIT_SUCCESS',
    data,
  };
}

export function bidSeasonsPositionEdit(position, incumbent, status) {
  return (dispatch) => {
    if (cancel) { cancel('cancel'); }
    dispatch(bidSeasonsPositionEditIsLoading(true));
    dispatch(bidSeasonsPositionEditHasErrored(false));
    api()
      .post('/placeholder/POST/endpoint', {
        position,
        incumbent,
        status,
      }, {
        cancelToken: new CancelToken((c) => {
          cancel = c;
        }),
      })
      .then(({ data }) => {
        batch(() => {
          dispatch(bidSeasonsPositionEditHasErrored(false));
          dispatch(bidSeasonsPositionEditSuccess(data || []));
          dispatch(
            toastSuccess(EDIT_BID_SEASON_SUCCESS, EDIT_BID_SEASON_SUCCESS_TITLE));
          dispatch(bidSeasonsPositionEditIsLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          dispatch(bidSeasonsPositionEditHasErrored(false));
          dispatch(bidSeasonsPositionEditIsLoading(false));
        } else {
          dispatch(toastError(EDIT_BID_SEASON_ERROR,
            EDIT_BID_SEASON_ERROR_TITLE));
          dispatch(bidSeasonsPositionEditHasErrored(true));
          dispatch(bidSeasonsPositionEditIsLoading(false));
        }
      });
  };
}
