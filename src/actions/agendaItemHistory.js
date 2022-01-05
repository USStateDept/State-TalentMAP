import { get } from 'lodash';
import { downloadFromResponse, formatDate } from 'utilities';
import { CancelToken } from 'axios';
import api from '../api';

let cancel;

export function aihHasErrored(bool) {
  return {
    type: 'AIH_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function aihIsLoading(bool) {
  return {
    type: 'AIH_IS_LOADING',
    isLoading: bool,
  };
}
export function aihFetchDataSuccess(data) {
  return {
    type: 'AIH_FETCH_DATA_SUCCESS',
    data,
  };
}

// eslint-disable-next-line import/prefer-default-export
export function agendaItemHistoryExport(perdet = '', ordering = '') {
  return api()
    .get(`/fsbid/agenda/agenda_items/export/?perdet=${perdet}&ordering=${ordering}`)
    .then((response) => {
      downloadFromResponse(response, `Agenda_Item_History_${formatDate(new Date().getTime(), 'YYYY_M_D_Hms')}`);
    });
}

export function aihFetchData(perdet = '', ordering = '') {
  return (dispatch) => {
    if (cancel) { cancel('cancel'); }
    if (!perdet) {
      dispatch(aihHasErrored(true));
      dispatch(aihIsLoading(false));
    } else {
      dispatch(aihHasErrored(false));
      dispatch(aihIsLoading(true));
      api()
        .get(`/fsbid/agenda/agenda_items/?perdet=${perdet}&ordering=${ordering}`, { cancelToken: new CancelToken((c) => {
          cancel = c;
        }) })
        .then(({ data }) => data.results || [])
        .then((data$) => {
          dispatch(aihFetchDataSuccess(data$));
          dispatch(aihHasErrored(false));
          dispatch(aihIsLoading(false));
        })
        .catch((err) => {
          if (get(err, 'message') === 'cancel') {
            dispatch(aihHasErrored(false));
            dispatch(aihIsLoading(true));
          } else {
            dispatch(aihHasErrored(true));
            dispatch(aihIsLoading(false));
          }
        });
    }
  };
}
