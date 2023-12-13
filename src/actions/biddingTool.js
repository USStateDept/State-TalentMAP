import {
  CREATE_BIDDING_TOOL_ERROR,
  CREATE_BIDDING_TOOL_ERROR_TITLE,
  CREATE_BIDDING_TOOL_SUCCESS,
  CREATE_BIDDING_TOOL_SUCCESS_TITLE,
  DELETE_BIDDING_TOOL_ERROR,
  DELETE_BIDDING_TOOL_ERROR_TITLE,
  DELETE_BIDDING_TOOL_SUCCESS,
  DELETE_BIDDING_TOOL_SUCCESS_TITLE,
  EDIT_BIDDING_TOOL_ERROR,
  EDIT_BIDDING_TOOL_ERROR_TITLE,
  EDIT_BIDDING_TOOL_SUCCESS,
  EDIT_BIDDING_TOOL_SUCCESS_TITLE,
} from 'Constants/SystemMessages';
import { CancelToken } from 'axios';
import { batch } from 'react-redux';
import api from '../api';
import { toastError, toastSuccess } from './toast';

let cancelBiddingTool;

// ================ BIDDING TOOL ================

export function biddingToolFetchDataErrored(bool) {
  return {
    type: 'BIDDING_TOOL_FETCH_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function biddingToolFetchDataLoading(bool) {
  return {
    type: 'BIDDING_TOOL_FETCH_IS_LOADING',
    isLoading: bool,
  };
}
export function biddingToolFetchDataSuccess(results) {
  return {
    type: 'BIDDING_TOOL_FETCH_SUCCESS',
    results,
  };
}
export function biddingTool(id) {
  return (dispatch) => {
    if (cancelBiddingTool) {
      cancelBiddingTool('cancel');
      dispatch(biddingToolFetchDataLoading(true));
    }
    batch(() => {
      dispatch(biddingToolFetchDataLoading(true));
      dispatch(biddingToolFetchDataErrored(false));
    });
    const ep = `/fsbid/bidding_tool/${id}/`;
    api().get(ep, {
      cancelToken: new CancelToken((c) => { cancelBiddingTool = c; }),
    })
      .then(({ data }) => {
        batch(() => {
          dispatch(biddingToolFetchDataSuccess(data));
          dispatch(biddingToolFetchDataErrored(false));
          dispatch(biddingToolFetchDataLoading(false));
        });
      })
      .catch(() => {
        batch(() => {
          dispatch(biddingToolFetchDataErrored(true));
          dispatch(biddingToolFetchDataLoading(false));
        });
      });
  };
}


// ================ BIDDING TOOL LIST ================

export function biddingToolsFetchDataErrored(bool) {
  return {
    type: 'BIDDING_TOOLS_FETCH_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function biddingToolsFetchDataLoading(bool) {
  return {
    type: 'BIDDING_TOOLS_FETCH_IS_LOADING',
    isLoading: bool,
  };
}
export function biddingToolsFetchDataSuccess(results) {
  return {
    type: 'BIDDING_TOOLS_FETCH_SUCCESS',
    results,
  };
}
export function biddingTools() {
  return (dispatch) => {
    if (cancelBiddingTool) {
      cancelBiddingTool('cancel');
      dispatch(biddingToolsFetchDataLoading(true));
    }
    batch(() => {
      dispatch(biddingToolsFetchDataLoading(true));
      dispatch(biddingToolsFetchDataErrored(false));
    });
    const ep = '/fsbid/bidding_tool/';
    api().get(ep, {
      cancelToken: new CancelToken((c) => { cancelBiddingTool = c; }),
    })
      .then(({ data }) => {
        batch(() => {
          dispatch(biddingToolsFetchDataErrored(false));
          dispatch(biddingToolsFetchDataSuccess(data));
          dispatch(biddingToolsFetchDataLoading(false));
        });
      })
      .catch(() => {
        dispatch(biddingToolsFetchDataErrored(true));
        dispatch(biddingToolsFetchDataLoading(false));
      });
  };
}

// ================ BIDDING TOOL DELETE ================

export function biddingToolDeleteErrored(bool) {
  return {
    type: 'BIDDING_TOOL_DELETE_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function biddingToolDeleteLoading(bool) {
  return {
    type: 'BIDDING_TOOL_DELETE_IS_LOADING',
    isLoading: bool,
  };
}
export function biddingToolDeleteSuccess(results) {
  return {
    type: 'BIDDING_TOOL_DELETE_SUCCESS',
    results,
  };
}
export function biddingToolDelete(query) {
  return (dispatch) => {
    batch(() => {
      dispatch(biddingToolDeleteLoading(true));
      dispatch(biddingToolDeleteErrored(false));
    });
    api().delete('/fsbid/bidding_tool/', query)
      .then(({ data }) => {
        const toastTitle = DELETE_BIDDING_TOOL_SUCCESS_TITLE;
        const toastMessage = DELETE_BIDDING_TOOL_SUCCESS;
        batch(() => {
          dispatch(biddingToolDeleteErrored(false));
          dispatch(toastSuccess(toastMessage, toastTitle));
          dispatch(biddingToolDeleteSuccess(data));
          dispatch(biddingToolDeleteLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(biddingToolDeleteLoading(true));
            dispatch(biddingToolDeleteErrored(false));
          });
        } else {
          const toastTitle = DELETE_BIDDING_TOOL_ERROR_TITLE;
          const toastMessage = DELETE_BIDDING_TOOL_ERROR;
          batch(() => {
            dispatch(biddingToolDeleteErrored(true));
            dispatch(toastError(toastMessage, toastTitle));
            dispatch(biddingToolDeleteLoading(false));
          });
        }
      });
  };
}

// ================ BIDDING TOOL EDIT ================

export function biddingToolEditHasErrored(bool) {
  return {
    type: 'BIDDING_TOOL_EDIT_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function biddingToolEditIsLoading(bool) {
  return {
    type: 'BIDDING_TOOL_EDIT_IS_LOADING',
    isLoading: bool,
  };
}
export function biddingToolEditSuccess(results) {
  return {
    type: 'BIDDING_TOOL_EDIT_SUCCESS',
    results,
  };
}
export function biddingToolEdit(query) {
  return (dispatch) => {
    batch(() => {
      dispatch(biddingToolEditIsLoading(true));
      dispatch(biddingToolEditHasErrored(false));
    });
    api().put('/fsbid/bidding_tool/', query)
      .then(({ data }) => {
        const toastTitle = EDIT_BIDDING_TOOL_SUCCESS_TITLE;
        const toastMessage = EDIT_BIDDING_TOOL_SUCCESS;
        batch(() => {
          dispatch(biddingToolEditHasErrored(false));
          dispatch(toastSuccess(toastMessage, toastTitle));
          dispatch(biddingToolEditSuccess(data));
          dispatch(biddingToolEditIsLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(biddingToolEditIsLoading(true));
            dispatch(biddingToolEditHasErrored(false));
          });
        } else {
          const toastTitle = EDIT_BIDDING_TOOL_ERROR_TITLE;
          const toastMessage = EDIT_BIDDING_TOOL_ERROR;
          batch(() => {
            dispatch(biddingToolEditHasErrored(true));
            dispatch(toastError(toastMessage, toastTitle));
            dispatch(biddingToolEditIsLoading(false));
          });
        }
      });
  };
}


// ================ BIDDING TOOL CREATE ================

export function biddingToolCreateHasErrored(bool) {
  return {
    type: 'BIDDING_TOOL_CREATE_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function biddingToolCreateIsLoading(bool) {
  return {
    type: 'BIDDING_TOOL_CREATE_IS_LOADING',
    isLoading: bool,
  };
}
export function biddingToolCreateSuccess(results) {
  return {
    type: 'BIDDING_TOOL_CREATE_SUCCESS',
    results,
  };
}
export function biddingToolCreate(query) {
  return (dispatch) => {
    batch(() => {
      dispatch(biddingToolCreateIsLoading(true));
      dispatch(biddingToolCreateHasErrored(false));
    });
    api().put('/fsbid/bidding_tool/', query)
      .then(({ data }) => {
        const toastTitle = CREATE_BIDDING_TOOL_SUCCESS_TITLE;
        const toastMessage = CREATE_BIDDING_TOOL_SUCCESS;
        batch(() => {
          dispatch(biddingToolCreateHasErrored(false));
          dispatch(toastSuccess(toastMessage, toastTitle));
          dispatch(biddingToolCreateSuccess(data));
          dispatch(biddingToolCreateIsLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(biddingToolEditIsLoading(true));
            dispatch(biddingToolCreateHasErrored(false));
          });
        } else {
          const toastTitle = CREATE_BIDDING_TOOL_ERROR_TITLE;
          const toastMessage = CREATE_BIDDING_TOOL_ERROR;
          batch(() => {
            dispatch(biddingToolCreateHasErrored(true));
            dispatch(toastError(toastMessage, toastTitle));
            dispatch(biddingToolCreateIsLoading(false));
          });
        }
      });
  };
}
