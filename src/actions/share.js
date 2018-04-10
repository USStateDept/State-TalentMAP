import api from '../api';

export function shareHasErrored(bool) {
  return {
    type: 'SHARE_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function shareIsSending(bool) {
  return {
    type: 'SHARE_IS_SENDING',
    isLoading: bool,
  };
}

export function shareSuccess(share) {
  return {
    type: 'SHARE_SUCCESS',
    share,
  };
}

export function shareSendData(data) {
  return (dispatch) => {
    dispatch(shareIsSending(true));
    dispatch(shareSuccess(false));
    dispatch(shareHasErrored(false));
    api.post('/share/', data)
      .then((response) => {
        dispatch(shareIsSending(false));
        dispatch(shareHasErrored(false));
        return response.data;
      })
      .then(share => dispatch(shareSuccess(share)))
      .catch((err) => {
        dispatch(shareHasErrored(
          err.response.data.message || 'An error occurred trying to share this position.',
        ));
        dispatch(shareIsSending(false));
        dispatch(shareSuccess(false));
        return err.response.data.message;
      });
  };
}
