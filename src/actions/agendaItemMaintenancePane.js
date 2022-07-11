import { get } from 'lodash';
import { CancelToken } from 'axios';
import api from '../api';

let cancel;

export function aihAddLegErrored(bool) {
  return {
    type: 'AIH_ADD_LEG_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function aihAddLegLoading(bool) {
  return {
    type: 'AIH_ADD_LEG_IS_LOADING',
    isLoading: bool,
  };
}
export function aihAddLegSuccess(data) {
  return {
    type: 'AIH_ADD_LEG_SUCCESS',
    data,
  };
}

export function aihAddLeg(pos_num = '', ai_seq = '') {
  // eslint-disable-next-line no-console
  console.log('current in action file');
  return (dispatch) => {
    if (cancel) { cancel('cancel'); }
    dispatch(aihAddLegErrored(false));
    dispatch(aihAddLegLoading(true));
    api()
      .put(`/fsbid/agenda/agenda_items/${ai_seq}/add_leg/?position__position_number__in=${pos_num}&q=`, { cancelToken: new CancelToken((c) => {
        cancel = c;
      }) })
      .then(({ data }) => data || [])
      .then((data$) => {
        dispatch(aihAddLegSuccess(data$));
        dispatch(aihAddLegErrored(false));
        dispatch(aihAddLegLoading(false));
      })
      .catch((err) => {
        if (get(err, 'message') === 'cancel') {
          dispatch(aihAddLegErrored(false));
          dispatch(aihAddLegLoading(true));
        } else {
          dispatch(aihAddLegErrored(true));
          dispatch(aihAddLegLoading(false));
        }
      });
  };
}
