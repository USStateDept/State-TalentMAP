import { batch } from 'react-redux';
import { UPDATE_PANEL_MEETING_SUCCESS_TITLE,
  UPDATE_PANEL_MEETING_SUCCESS,
  UPDATE_PANEL_MEETING_ERROR_TITLE,
  UPDATE_PANEL_MEETING_ERROR,
} from 'Constants/SystemMessages';
import api from '../api';
import { toastError, toastSuccess } from './toast';

export function createPanelMeetingHasErrored(bool) {
  return {
    type: 'CREATE_PANEL_MEETING_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function createPanelMeetingIsLoading(bool) {
  return {
    type: 'CREATE_PANEL_MEETING_IS_LOADING',
    isLoading: bool,
  };
}
export function createPanelMeetingSuccess(data) {
  return {
    type: 'CREATE_PANEL_MEETING_SUCCESS',
    data,
  };
}

// eslint-disable-next-line no-unused-vars
export function createPanelMeeting(props) {
  return (dispatch) => {
    dispatch(createPanelMeetingSuccess([]));
    dispatch(createPanelMeetingIsLoading(true));
    dispatch(createPanelMeetingHasErrored(false));
    // api().post('/panelmeetingadminendpoint', {
    //   props,
    // })
    api().get('/fsbid/reference/classifications/')
      .then(({ data }) => {
        batch(() => {
          dispatch(createPanelMeetingHasErrored(false));
          dispatch(createPanelMeetingSuccess(data || []));
          dispatch(toastSuccess(UPDATE_PANEL_MEETING_SUCCESS, UPDATE_PANEL_MEETING_SUCCESS_TITLE));
          dispatch(createPanelMeetingIsLoading(false));
        });
      }).catch(() => {
        dispatch(toastError(UPDATE_PANEL_MEETING_ERROR, UPDATE_PANEL_MEETING_ERROR_TITLE));
        dispatch(createPanelMeetingHasErrored(true));
        dispatch(createPanelMeetingIsLoading(false));
      });
  };
}
