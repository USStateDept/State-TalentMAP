import { batch } from 'react-redux';
import { CancelToken } from 'axios';
import {
  UPDATE_PANEL_MEETING_ERROR,
  UPDATE_PANEL_MEETING_ERROR_TITLE,
  UPDATE_PANEL_MEETING_SUCCESS,
  UPDATE_PANEL_MEETING_SUCCESS_TITLE,
} from 'Constants/SystemMessages';
import api from '../api';
import { toastError, toastSuccess } from './toast';

let cancelRunPanel;

// ======================== Create Panel Meeting ========================

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
export function createPanelMeeting(request, isCreate) {
  return (dispatch) => {
    dispatch(createPanelMeetingSuccess([]));
    dispatch(createPanelMeetingIsLoading(true));
    dispatch(createPanelMeetingHasErrored(false));
    api().post('/fsbid/admin/panel/edit/',
      request,
    ).then(({ data }) => {
      const message = UPDATE_PANEL_MEETING_SUCCESS(data, isCreate);
      batch(() => {
        dispatch(createPanelMeetingHasErrored(false));
        dispatch(createPanelMeetingSuccess(data || []));
        dispatch(toastSuccess(message, UPDATE_PANEL_MEETING_SUCCESS_TITLE));
        dispatch(createPanelMeetingIsLoading(false));
      });
    }).catch(() => {
      dispatch(toastError(UPDATE_PANEL_MEETING_ERROR, UPDATE_PANEL_MEETING_ERROR_TITLE));
      dispatch(createPanelMeetingHasErrored(true));
      dispatch(createPanelMeetingIsLoading(false));
    });
  };
}

// ======================== Run Panel Meeting ========================

export function runOfficialPreliminarySuccess(result) {
  return {
    type: 'RUN_OFFICIAL_PRELIMINARY_SUCCESS',
    result,
  };
}

export function runOfficialPreliminaryErrored(bool) {
  return {
    type: 'RUN_OFFICIAL_PRELIMINARY_ERRORED',
    hasErrored: bool,
  };
}

export function runOfficialAddendumSuccess(result) {
  return {
    type: 'RUN_OFFICIAL_ADDENDUM_SUCCESS',
    result,
  };
}

export function runOfficialAddendumErrored(bool) {
  return {
    type: 'RUN_OFFICIAL_ADDENDUM_ERRORED',
    hasErrored: bool,
  };
}

export function runPostPanelProcessingSuccess(result) {
  return {
    type: 'RUN_POST_PANEL_PROCESSING_SUCCESS',
    result,
  };
}

export function runPostPanelProcessingErrored(bool) {
  return {
    type: 'RUN_POST_PANEL_PROCESSING_ERRORED',
    hasErrored: bool,
  };
}

export function runPanelMeeting(id, type) {
  let success = runPostPanelProcessingSuccess;
  let successTitle = 'Run Post Panel Success';
  let successMessage = 'This Panel Meeting has ran Post Panel successfully.';
  let errored = runPostPanelProcessingErrored;
  let errorTitle = 'Run Post Panel Error';
  let errorMessage = 'There was an issue attempting to Run Post Panel. Please try again.';
  if (type === 'preliminary') {
    success = runOfficialPreliminarySuccess;
    successTitle = 'Run Official Preliminary Success';
    successMessage = 'This Panel Meeting has ran Official Preliminary successfully.';
    errored = runOfficialPreliminaryErrored;
    errorTitle = 'Run Official Preliminary Error';
    errorMessage = 'There was an issue attempting to Run Official Preliminary. Please try again.';
  }
  if (type === 'addendum') {
    success = runPostPanelProcessingSuccess;
    successTitle = 'Run Official Addendum Success';
    successMessage = 'This Panel Meeting has ran Official Addendum successfully.';
    errored = runPostPanelProcessingErrored;
    errorTitle = 'Run Official Addendum Error';
    errorMessage = 'There was an issue attempting to Run Official Addendum. Please try again.';
  }
  return (dispatch) => {
    if (cancelRunPanel) {
      cancelRunPanel('cancel');
    }
    batch(() => {
      dispatch(errored(false));
    });
    const ep = `/fsbid/admin/panel/run/${type}/${id}/`;
    api().put(ep, {
      cancelToken: new CancelToken((c) => { cancelRunPanel = c; }),
    })
      .then(({ data }) => {
        batch(() => {
          dispatch(errored(false));
          dispatch(success(data));
          dispatch(toastSuccess(
            successMessage,
            successTitle,
          ));
        });
      })
      .catch((err) => {
        dispatch(errored(true));
        dispatch(toastError(
          `${errorMessage} ${err?.error_message ?? ''}`,
          errorTitle,
        ));
      });
  };
}
