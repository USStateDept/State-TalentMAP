import { batch } from 'react-redux';
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


export function bidSeasonsFetchData() {
  return (dispatch) => {
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


export function bidSeasonsCreateSuccess(bool) {
  return {
    type: 'BID_SEASONS_POSITION_CREATE_SUCCESS',
    success: bool,
  };
}

export function bidSeasonsCreate(seasonInfo) {
  return (dispatch) => {
    dispatch(bidSeasonsCreateSuccess(false));
    api()
      .post('fsbid/manage_bid_seasons/', {
        data: seasonInfo,
      })
      .then(() => {
        batch(() => {
          dispatch(bidSeasonsCreateSuccess(true));
          dispatch(toastSuccess(ADD_BID_SEASON_SUCCESS, ADD_BID_SEASON_SUCCESS_TITLE));
          dispatch(bidSeasonsFetchData());
        });
      })
      .catch((err) => {
        dispatch(bidSeasonsCreateSuccess(false));
        dispatch(toastError(err?.response?.data ?? ADD_BID_SEASON_ERROR,
          ADD_BID_SEASON_ERROR_TITLE));
      });
  };
}


export function bidSeasonsEditSuccess(bool) {
  return {
    type: 'BID_SEASONS_POSITION_EDIT_SUCCESS',
    success: bool,
  };
}

export function bidSeasonsEdit(data) {
  return (dispatch) => {
    dispatch(bidSeasonsEditSuccess(false));
    api()
      .post('fsbid/manage_bid_seasons/', {
        data,
      })
      .then(() => {
        batch(() => {
          dispatch(bidSeasonsEditSuccess(true));
          dispatch(toastSuccess(EDIT_BID_SEASON_SUCCESS, EDIT_BID_SEASON_SUCCESS_TITLE));
          dispatch(bidSeasonsFetchData());
        });
      })
      .catch((err) => {
        dispatch(bidSeasonsEditSuccess(false));
        dispatch(toastError(err?.response?.data ?? EDIT_BID_SEASON_ERROR,
          EDIT_BID_SEASON_ERROR_TITLE));
      });
  };
}
