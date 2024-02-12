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
    type: 'BIDDING_TOOL_FETCH_ERRORED',
    hasErrored: bool,
  };
}
export function biddingToolFetchDataLoading(bool) {
  return {
    type: 'BIDDING_TOOL_FETCH_LOADING',
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
    type: 'BIDDING_TOOLS_FETCH_ERRORED',
    hasErrored: bool,
  };
}
export function biddingToolsFetchDataLoading(bool) {
  return {
    type: 'BIDDING_TOOLS_FETCH_LOADING',
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
    type: 'BIDDING_TOOL_DELETE_ERRORED',
    hasErrored: bool,
  };
}
export function biddingToolDeleteLoading(bool) {
  return {
    type: 'BIDDING_TOOL_DELETE_LOADING',
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
        batch(() => {
          dispatch(biddingToolDeleteErrored(false));
          dispatch(biddingToolDeleteSuccess(data));
          dispatch(toastSuccess(DELETE_BIDDING_TOOL_SUCCESS, DELETE_BIDDING_TOOL_SUCCESS_TITLE));
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
          batch(() => {
            dispatch(biddingToolDeleteErrored(true));
            dispatch(toastError(DELETE_BIDDING_TOOL_ERROR, DELETE_BIDDING_TOOL_ERROR_TITLE));
            dispatch(biddingToolDeleteLoading(false));
          });
        }
      });
  };
}

// ================ BIDDING TOOL EDIT ================

export function biddingToolEditErrored(bool) {
  return {
    type: 'BIDDING_TOOL_EDIT_ERRORED',
    hasErrored: bool,
  };
}
export function biddingToolEditLoading(bool) {
  return {
    type: 'BIDDING_TOOL_EDIT_LOADING',
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
      dispatch(biddingToolEditLoading(true));
      dispatch(biddingToolEditErrored(false));
    });
    api().put('/fsbid/bidding_tool/', query)
      .then(({ data }) => {
        batch(() => {
          dispatch(biddingToolEditErrored(false));
          dispatch(biddingToolEditSuccess(data));
          dispatch(toastSuccess(EDIT_BIDDING_TOOL_SUCCESS, EDIT_BIDDING_TOOL_SUCCESS_TITLE));
          dispatch(biddingToolEditLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(biddingToolEditLoading(true));
            dispatch(biddingToolEditErrored(false));
          });
        } else {
          batch(() => {
            dispatch(biddingToolEditErrored(true));
            dispatch(toastError(EDIT_BIDDING_TOOL_ERROR, EDIT_BIDDING_TOOL_ERROR_TITLE));
            dispatch(biddingToolEditLoading(false));
          });
        }
      });
  };
}


// ================ BIDDING TOOL CREATE ================

export function biddingToolCreateErrored(bool) {
  return {
    type: 'BIDDING_TOOL_CREATE_ERRORED',
    hasErrored: bool,
  };
}
export function biddingToolCreateLoading(bool) {
  return {
    type: 'BIDDING_TOOL_CREATE_LOADING',
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
      dispatch(biddingToolCreateLoading(true));
      dispatch(biddingToolCreateErrored(false));
    });
    api().put('/fsbid/bidding_tool/', query)
      .then(({ data }) => {
        batch(() => {
          dispatch(biddingToolCreateErrored(false));
          dispatch(biddingToolCreateSuccess(data));
          dispatch(toastSuccess(CREATE_BIDDING_TOOL_SUCCESS, CREATE_BIDDING_TOOL_SUCCESS_TITLE));
          dispatch(biddingToolCreateLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(biddingToolCreateLoading(true));
            dispatch(biddingToolCreateErrored(false));
          });
        } else {
          batch(() => {
            dispatch(biddingToolCreateErrored(true));
            dispatch(toastError(CREATE_BIDDING_TOOL_ERROR, CREATE_BIDDING_TOOL_ERROR_TITLE));
            dispatch(biddingToolCreateLoading(false));
          });
        }
      });
  };
}

export function biddingToolCreateDataErrored(bool) {
  return {
    type: 'BIDDING_TOOL_CREATE_DATA_ERRORED',
    hasErrored: bool,
  };
}
export function biddingToolCreateDataLoading(bool) {
  return {
    type: 'BIDDING_TOOL_CREATE_DATA_LOADING',
    isLoading: bool,
  };
}
export function biddingToolCreateDataSuccess(results) {
  return {
    type: 'BIDDING_TOOL_CREATE_DATA_SUCCESS',
    results,
  };
}
export function biddingToolCreateData() {
  return (dispatch) => {
    batch(() => {
      dispatch(biddingToolCreateDataLoading(true));
      dispatch(biddingToolCreateDataErrored(false));
    });
    api().get('/fsbid/bidding_tool/create/', {
      cancelToken: new CancelToken((c) => { cancelBiddingTool = c; }),
    })
      .then(({ data }) => {
        batch(() => {
          dispatch(biddingToolCreateDataErrored(false));
          dispatch(biddingToolCreateDataSuccess(data));
          dispatch(biddingToolCreateDataLoading(false));
        });
      })
      .catch(() => {
        dispatch(biddingToolCreateDataErrored(true));
        dispatch(biddingToolCreateDataLoading(false));
      });
  };
}
