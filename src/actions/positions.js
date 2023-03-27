import { ADD_FREQUENT_POSITION_ERROR, ADD_FREQUENT_POSITION_ERROR_TITLE } from 'Constants/SystemMessages';
import api from '../api';
import { toastError } from './toast';

export function positionsHasErrored(bool) {
  return {
    type: 'POSITIONS_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function frequentPositionsHasErrored(bool) {
  return {
    type: 'FREQUENT_POSITIONS_HAS_ERRORED',
    hasErroredFP: bool,
  };
}

export function positionsIsLoading(bool) {
  return {
    type: 'POSITIONS_IS_LOADING',
    isLoading: bool,
  };
}

export function frequentPositionsIsLoading(bool) {
  return {
    type: 'FREQUENT_POSITIONS_IS_LOADING',
    isLoadingFP: bool,
  };
}

export function positionsFetchDataSuccess(data) {
  return {
    type: 'POSITIONS_SUCCESS',
    data,
  };
}

export function positionsFetchData(query) {
  return (dispatch) => {
    dispatch(positionsIsLoading(true));
    dispatch(positionsHasErrored(false));
    const prefix = '/fsbid/positions';
    api().get(`${prefix}/?${query}`)
      .then((response) => {
        dispatch(positionsHasErrored(false));
        dispatch(positionsIsLoading(false));
        dispatch(positionsFetchDataSuccess(response.data));
      })
      .catch(() => {
        dispatch(positionsHasErrored(true));
        dispatch(positionsIsLoading(false));
      });
  };
}

export function addFrequentPositionsData(query) {
  return (dispatch) => {
    dispatch(frequentPositionsIsLoading(true));
    dispatch(frequentPositionsHasErrored(false));
    const prefix = '/fsbid/positions';
    api().get(`${prefix}/?${query}`)
      .then((response) => {
        dispatch(frequentPositionsHasErrored(false));
        dispatch(frequentPositionsIsLoading(false));
        dispatch(positionsFetchDataSuccess(response.data));
      })
      .catch(() => {
        const toastTitle = ADD_FREQUENT_POSITION_ERROR_TITLE;
        const toastMessage = ADD_FREQUENT_POSITION_ERROR;
        dispatch(frequentPositionsHasErrored(true));
        dispatch(frequentPositionsIsLoading(false));
        dispatch(toastError(toastMessage, toastTitle));
      });
  };
}
