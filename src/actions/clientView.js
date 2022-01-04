import { batch } from 'react-redux';
import api from '../api';
import { toastError, toastSuccess } from './toast';
import { clientBidListFetchData } from './bidList';
import { GET_CLIENT_SUCCESS_MESSAGE, SET_CLIENT_ERROR, SET_CLIENT_SUCCESS,
  UNSET_CLIENT_SUCCESS, UNSET_CLIENT_SUCCESS_MESSAGE } from '../Constants/SystemMessages';

export function setClientViewAs({ loadingId, client, isLoading, hasErrored }) {
  return {
    type: 'SET_CLIENT_VIEW_AS',
    config: {
      loadingId,
      client,
      isLoading,
      hasErrored,
    },
  };
}

export function unsetClientView() {
  return {
    type: 'UNSET_CLIENT_VIEW',
  };
}

export function setClient(id) {
  return (dispatch) => {
    dispatch(setClientViewAs({ client: {}, isLoading: true, hasErrored: false }));
    api().get(`/fsbid/client/${id}/`)
      .then(({ data }) => {
        batch(() => {
          dispatch(setClientViewAs({ client: data, isLoading: false, hasErrored: false }));
          dispatch(clientBidListFetchData());
          dispatch(toastSuccess(GET_CLIENT_SUCCESS_MESSAGE(data), SET_CLIENT_SUCCESS),
          );
        });
      })
      .catch(() => {
        batch(() => {
          dispatch(setClientViewAs({ client: {}, isLoading: false, hasErrored: true }));
          dispatch(toastError('Please try again.', SET_CLIENT_ERROR));
        });
      });
  };
}

export function unsetClient() {
  return (dispatch) => {
    batch(() => {
      dispatch(unsetClientView());
      dispatch(toastSuccess(UNSET_CLIENT_SUCCESS_MESSAGE, UNSET_CLIENT_SUCCESS));
    });
  };
}
