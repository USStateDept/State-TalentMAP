import { batch } from 'react-redux';
import { SAVE_ADMIN_REMARK_HAS_ERRORED,
  SAVE_ADMIN_REMARK_HAS_ERRORED_TITLE, SAVE_ADMIN_REMARK_SUCCESS,
  SAVE_ADMIN_REMARK_SUCCESS_TITLE,
} from 'Constants/SystemMessages';
import api from '../api';
import { toastError, toastSuccess } from './toast';

export function saveAdminRemarkHasErrored(bool) {
  return {
    type: 'SAVE_ADMIN_REMARK_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function saveAdminRemarkIsLoading(bool) {
  return {
    type: 'SAVE_ADMIN_REMARK_IS_LOADING',
    isLoading: bool,
  };
}
export function saveAdminRemarkSuccess(data) {
  return {
    type: 'SAVE_ADMIN_REMARK_SUCCESS',
    data,
  };
}

export function saveRemark(props) {
  return (dispatch) => {
    dispatch(saveAdminRemarkIsLoading(true));
    dispatch(saveAdminRemarkHasErrored(false));
    api().post('/fsbid/admin/panel/remark/', props)
      .then(({ data }) => {
        batch(() => {
          dispatch(saveAdminRemarkHasErrored(false));
          dispatch(saveAdminRemarkSuccess(data || []));
          dispatch(toastSuccess(SAVE_ADMIN_REMARK_SUCCESS, SAVE_ADMIN_REMARK_SUCCESS_TITLE));
          dispatch(saveAdminRemarkIsLoading(false));
        });
      })
      .catch(() => {
        dispatch(toastError(SAVE_ADMIN_REMARK_HAS_ERRORED, SAVE_ADMIN_REMARK_HAS_ERRORED_TITLE));
        dispatch(saveAdminRemarkHasErrored(true));
        dispatch(saveAdminRemarkIsLoading(false));
      });
  };
}
