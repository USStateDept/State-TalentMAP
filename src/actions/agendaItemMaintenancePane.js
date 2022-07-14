import { get } from 'lodash';
import { CancelToken } from 'axios';
import api from '../api';

let cancel;

export function aiCreateErrored(bool) {
  return {
    type: 'AI_CREATE_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function aiCreateLoading(bool) {
  return {
    type: 'AI_CREATE_IS_LOADING',
    isLoading: bool,
  };
}
export function aiCreateSuccess(data) {
  return {
    type: 'AI_CREATE_SUCCESS',
    data,
  };
}

// eslint-disable-next-line no-unused-vars
export function aiCreate(post_body) {
  // eslint-disable-next-line no-console
  console.log('current in action file');
  return (dispatch) => {
    if (cancel) { cancel('cancel'); }
    dispatch(aiCreateErrored(false));
    dispatch(aiCreateLoading(true));
    api()
      .post('/fsbid/agenda/agenda_items/&q=', { cancelToken: new CancelToken((c) => {
        cancel = c;
      }) })
      .then(({ data }) => data || [])
      .then((data$) => {
        dispatch(aiCreateSuccess(data$));
        dispatch(aiCreateErrored(false));
        dispatch(aiCreateLoading(false));
      })
      .catch((err) => {
        if (get(err, 'message') === 'cancel') {
          dispatch(aiCreateErrored(false));
          dispatch(aiCreateLoading(true));
        } else {
          dispatch(aiCreateErrored(true));
          dispatch(aiCreateLoading(false));
        }
      });
  };
}
