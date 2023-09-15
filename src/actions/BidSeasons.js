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


export function bidSeasonsFetchDataErrored(bool) {
  return {
    type: 'BID_SEASONS_FETCH_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function bidSeasonsFetchDataLoading(bool) {
  return {
    type: 'BID_SEASONS_FETCH_IS_LOADING',
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
    api().get('fsbid/manage_bid_seasons/')
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


export function bidSeasonsCreateHasErrored(bool) {
  return {
    type: 'BID_SEASON_POSITION_REMOVE_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function bidSeasonsCreateIsLoading(bool) {
  return {
    type: 'BID_SEASON_POSITION_REMOVE_IS_LOADING',
    isLoading: bool,
  };
}
export function bidSeasonsCreateSuccess(data) {
  return {
    type: 'BID_SEASON_POSITION_REMOVE_SUCCESS',
    data,
  };
}

export function bidSeasonsCreate(seasonInfo) {
  return (dispatch) => {
    if (cancel) { cancel('cancel'); }
    dispatch(bidSeasonsCreateIsLoading(true));
    dispatch(bidSeasonsCreateHasErrored(false));
    api()
      .post('fsbid/manage_bid_seasons/', {
        data: seasonInfo,
      }, {
        cancelToken: new CancelToken((c) => {
          cancel = c;
        }),
      })
      .then(({ data }) => {
        batch(() => {
          dispatch(bidSeasonsCreateHasErrored(false));
          dispatch(bidSeasonsCreateSuccess(data || []));
          dispatch(
            toastSuccess(ADD_BID_SEASON_SUCCESS,
              ADD_BID_SEASON_SUCCESS_TITLE));
          dispatch(bidSeasonsCreateIsLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          dispatch(bidSeasonsCreateHasErrored(false));
          dispatch(bidSeasonsCreateIsLoading(false));
        } else {
          dispatch(toastError(ADD_BID_SEASON_ERROR,
            ADD_BID_SEASON_ERROR_TITLE));
          dispatch(bidSeasonsCreateHasErrored(true));
          dispatch(bidSeasonsCreateIsLoading(false));
        }
      });
  };
}


export function bidSeasonsEditHasErrored(bool) {
  return {
    type: 'BID_SEASON_POSITION_EDIT_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function bidSeasonsEditIsLoading(bool) {
  return {
    type: 'BID_SEASON_POSITION_EDIT_IS_LOADING',
    isLoading: bool,
  };
}
export function bidSeasonsEditSuccess(data) {
  return {
    type: 'BID_SEASON_POSITION_EDIT_SUCCESS',
    data,
  };
}

export function bidSeasonsEdit(seasonInfo) {
  return (dispatch) => {
    if (cancel) { cancel('cancel'); }
    dispatch(bidSeasonsEditIsLoading(true));
    dispatch(bidSeasonsEditHasErrored(false));
    api()
      .post('fsbid/manage_bid_seasons/', {
        data: seasonInfo,
      }, {
        cancelToken: new CancelToken((c) => {
          cancel = c;
        }),
      })
      .then(({ data }) => {
        batch(() => {
          dispatch(bidSeasonsEditHasErrored(false));
          dispatch(bidSeasonsEditSuccess(data || []));
          dispatch(
            toastSuccess(EDIT_BID_SEASON_SUCCESS, EDIT_BID_SEASON_SUCCESS_TITLE));
          dispatch(bidSeasonsEditIsLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          dispatch(bidSeasonsEditHasErrored(false));
          dispatch(bidSeasonsEditIsLoading(false));
        } else {
          dispatch(toastError(EDIT_BID_SEASON_ERROR,
            EDIT_BID_SEASON_ERROR_TITLE));
          dispatch(bidSeasonsEditHasErrored(true));
          dispatch(bidSeasonsEditIsLoading(false));
        }
      });
  };
}
