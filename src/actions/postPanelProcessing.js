import { batch } from 'react-redux';
import api from '../api';
import {
  UPDATE_POST_PANEL_PROCESSING_ERROR, UPDATE_POST_PANEL_PROCESSING_ERROR_TITLE,
  UPDATE_POST_PANEL_PROCESSING_SUCCESS, UPDATE_POST_PANEL_PROCESSING_SUCCESS_TITLE,
} from '../Constants/SystemMessages';
import { toastError, toastSuccess } from './toast';


// =============== FETCH DATA ===============

export function postPanelProcessingFetchDataErrored(bool) {
  return {
    type: 'POST_PANEL_PROCESSING_FETCH_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function postPanelProcessingFetchDataLoading(bool) {
  return {
    type: 'POST_PANEL_PROCESSING_FETCH_IS_LOADING',
    isLoading: bool,
  };
}

export function postPanelProcessingFetchDataSuccess(results) {
  return {
    type: 'POST_PANEL_PROCESSING_FETCH_SUCCESS',
    results,
  };
}

export function postPanelProcessingFetchData() {
  return (dispatch) => {
    // Temporary hard coded data until backend is connected
    const tempData = [{
      value: true,
      item: '0',
      label: 'EUR',
      name: 'Favro, Michelle',
      status: 'APR',
    }, {
      value: true,
      item: '1',
      label: 'KYIV',
      name: 'Favro, Michelle',
      status: 'APR',
    }, {
      value: false,
      item: '2',
      label: 'Paris',
      name: 'Favro, Michelle',
      status: 'APR',
    }, {
      value: false,
      item: '3',
      label: 'GTM/CDA/EL',
      name: 'Favro, Michelle',
      status: 'APR',
    }];

    batch(() => {
      dispatch(postPanelProcessingFetchDataSuccess(tempData));
      dispatch(postPanelProcessingFetchDataErrored(false));
      dispatch(postPanelProcessingFetchDataLoading(false));
    });
  };
  // return (dispatch) => {
  //   if (cancelPostPanelProcessing) { cancelPostPanelProcessing('cancel'); }
  //   batch(() => {
  //     dispatch(postPanelProcessingFetchDataLoading(true));
  //     dispatch(postPanelProcessingFetchDataErrored(false));
  //   });
  //   const q = convertQueryToString(query);
  //   const endpoint = '/postpanelprocessingendpoint';
  //   const ep = `${endpoint}?${q}`;
  //   api().get(ep, {
  //     cancelToken: new CancelToken((c) => {
  //       cancelPostPanelProcessing = c;
  //     }),
  //   })
  //     .then(({ data }) => {
  //       batch(() => {
  //         dispatch(postPanelProcessingFetchDataSuccess(data));
  //         dispatch(postPanelProcessingFetchDataErrored(false));
  //         dispatch(postPanelProcessingFetchDataLoading(false));
  //       });
  //     })
  //     .catch((err) => {
  //       if (get(err, 'message') === 'cancel') {
  //         batch(() => {
  //           dispatch(postPanelProcessingFetchDataErrored(false));
  //           dispatch(postPanelProcessingFetchDataLoading(true));
  //         });
  //       } else {
  //         batch(() => {
  //           dispatch(postPanelProcessingFetchDataErrored(true));
  //           dispatch(postPanelProcessingFetchDataLoading(false));
  //         });
  //       }
  //     });
  // };
}

// =============== FETCH STATUSES ===============

export function postPanelStatusesFetchDataErrored(bool) {
  return {
    type: 'POST_PANEL_STATUSES_FETCH_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function postPanelStatusesFetchDataLoading(bool) {
  return {
    type: 'POST_PANEL_STATUSES_FETCH_IS_LOADING',
    isLoading: bool,
  };
}

export function postPanelStatusesFetchDataSuccess(results) {
  return {
    type: 'POST_PANEL_STATUSES_FETCH_SUCCESS',
    results,
  };
}

export function postPanelStatusesFetchData() {
  return (dispatch) => {
    // Temporary hard coded data until backend is connected
    const statusOptions = [{
      value: 'APR',
      label: 'APR',
    }, {
      value: 'DEF',
      label: 'DEF',
    }, {
      value: 'XXX',
      label: 'XXX',
    }, {
      value: 'DIS',
      label: 'DIS',
    }, {
      value: 'HLD',
      label: 'HLD',
    }, {
      value: 'MOV',
      label: 'MOV',
    }, {
      value: 'OOO',
      label: 'OOO',
    }, {
      value: 'PIP',
      label: 'PIP',
    }, {
      value: 'RDY',
      label: 'RDY',
    }, {
      value: 'WDR',
      label: 'WDR',
    }];
    batch(() => {
      dispatch(postPanelStatusesFetchDataSuccess(statusOptions));
      dispatch(postPanelStatusesFetchDataErrored(false));
      dispatch(postPanelStatusesFetchDataLoading(false));
    });
  };
  // return (dispatch) => {
  //   batch(() => {
  //     dispatch(postPanelStatusesFetchDataLoading(true));
  //     dispatch(postPanelStatusesFetchDataErrored(false));
  //   });
  //   const ep = '/v1/agendas/references/statuses';
  //   api().get(ep, {
  //     cancelToken: new CancelToken((c) => {
  //       cancelPostPanelProcessing = c;
  //     }),
  //   })
  //     .then(({ data }) => {
  //       batch(() => {
  //         dispatch(postPanelStatusesFetchDataSuccess(data));
  //         dispatch(postPanelStatusesFetchDataErrored(false));
  //         dispatch(postPanelStatusesFetchDataLoading(false));
  //       });
  //     })
  //     .catch((err) => {
  //       if (get(err, 'message') === 'cancel') {
  //         batch(() => {
  //           dispatch(postPanelStatusesFetchDataErrored(false));
  //           dispatch(postPanelStatusesFetchDataLoading(true));
  //         });
  //       } else {
  //         batch(() => {
  //           dispatch(postPanelStatusesFetchDataErrored(true));
  //           dispatch(postPanelStatusesFetchDataLoading(false));
  //         });
  //       }
  //     });
  // };
}

// =============== CREATE DATA ===============

export function createPostPanelProcessingHasErrored(bool) {
  return {
    type: 'CREATE_POST_PANEL_PROCESSING_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function createPostPanelProcessingIsLoading(bool) {
  return {
    type: 'CREATE_POST_PANEL_PROCESSING_IS_LOADING',
    isLoading: bool,
  };
}
export function createPostPanelProcessingSuccess(data) {
  return {
    type: 'CREATE_POST_PANEL_PROCESSING_SUCCESS',
    data,
  };
}

// eslint-disable-next-line no-unused-vars
export function createPostPanelProcessing(props) {
  return (dispatch) => {
    dispatch(createPostPanelProcessingSuccess([]));
    dispatch(createPostPanelProcessingIsLoading(true));
    dispatch(createPostPanelProcessingHasErrored(false));
    api().post('/postpanelprocessingendpoint', {
      props,
    }).then(({ data }) => {
      batch(() => {
        dispatch(createPostPanelProcessingHasErrored(false));
        dispatch(createPostPanelProcessingSuccess(data || []));
        dispatch(toastSuccess(
          UPDATE_POST_PANEL_PROCESSING_SUCCESS,
          UPDATE_POST_PANEL_PROCESSING_SUCCESS_TITLE,
        ));
        dispatch(createPostPanelProcessingIsLoading(false));
      });
    }).catch(() => {
      dispatch(toastError(
        UPDATE_POST_PANEL_PROCESSING_ERROR,
        UPDATE_POST_PANEL_PROCESSING_ERROR_TITLE,
      ));
      dispatch(createPostPanelProcessingHasErrored(true));
      dispatch(createPostPanelProcessingIsLoading(false));
    });
  };
}
