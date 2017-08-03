import axios from 'axios';
import { fetchUserToken } from '../utilities';

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

export function shareSendData(url, data) {
  return (dispatch) => {
    dispatch(shareIsSending(true));
    axios.post(url, data, { headers: { Authorization: fetchUserToken() } })
            .then((response) => {
              dispatch(shareIsSending(false));
              dispatch(shareSuccess(true));
              dispatch(shareHasErrored(false));
              return response.data;
            })
            .then(share => dispatch(shareSuccess(share)))
            .catch((err) => {
              dispatch(shareHasErrored(err.response.data.message));
              dispatch(shareIsSending(false));
              dispatch(shareSuccess(false));
              return err.response.data.message;
            });
  };
}
