import { batch } from 'react-redux';
import { CREATE_REMARK_ERROR,
  CREATE_REMARK_ERROR_TITLE, CREATE_REMARK_SUCCESS,
  CREATE_REMARK_SUCCESS_TITLE,
} from 'Constants/SystemMessages';
import api from '../api';
import { toastError, toastSuccess } from './toast';

export function createRemarkError(bool) {
  return {
    type: 'CREATE_REMARK_ERROR',
    hasErrored: bool,
  };
}
export function createRemarkLoading(bool) {
  return {
    type: 'CREATE_REMARK_LOADING',
    isLoading: bool,
  };
}
export function createRemarkSuccess(data) {
  return {
    type: 'CREATE_REMARK_SUCCESS',
    data,
  };
}

export function createRemark(props) {
  return (dispatch) => {
    dispatch(createRemarkLoading(true));
    dispatch(createRemarkError(false));
    api().post('/createremark/', {
      props,
    }).then(({ data }) => {
      batch(() => {
        dispatch(createRemarkError(false));
        dispatch(createRemarkLoading(false));
        dispatch(createRemarkSuccess(data || []));
        dispatch(toastSuccess(CREATE_REMARK_SUCCESS, CREATE_REMARK_SUCCESS_TITLE));
      });
    })
      .catch(() => {
        dispatch(toastError(CREATE_REMARK_ERROR, CREATE_REMARK_ERROR_TITLE));
        dispatch(createRemarkError(true));
        dispatch(createRemarkLoading(false));
      });
  };
}
