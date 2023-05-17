import { batch } from 'react-redux';
import { CREATE_PANEL_MEETING_ERROR,
  CREATE_PANEL_MEETING_ERROR_TITLE,
  CREATE_PANEL_MEETING_SUCCESS,
  CREATE_PANEL_MEETING_SUCCESS_TITLE,
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

export function createPanelMeeting(props) {
  return (dispatch) => {
    dispatch(createPanelMeetingIsLoading(true));
    dispatch(createPanelMeetingHasErrored(false));
    api().post('/panelmeetingadminendpoint', {
      props,
    }).then(({ data }) => {
      batch(() => {
        dispatch(createPanelMeetingHasErrored(false));
        dispatch(createPanelMeetingSuccess(data || []));
        dispatch(toastSuccess(CREATE_PANEL_MEETING_SUCCESS, CREATE_PANEL_MEETING_SUCCESS_TITLE));
        dispatch(createPanelMeetingIsLoading(false));
      });
    }).catch(() => {
      dispatch(toastError(CREATE_PANEL_MEETING_ERROR, CREATE_PANEL_MEETING_ERROR_TITLE));
      dispatch(createPanelMeetingHasErrored(true));
      dispatch(createPanelMeetingIsLoading(false));
    });
  };
}
