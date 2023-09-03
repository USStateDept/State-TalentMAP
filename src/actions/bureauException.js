import { batch } from 'react-redux';
import { CancelToken } from 'axios';
import {
  ADD_BUREAU_EXCEPTION_ERROR,
  ADD_BUREAU_EXCEPTION_ERROR_TITLE,
  ADD_BUREAU_EXCEPTION_SUCCESS,
  ADD_BUREAU_EXCEPTION_SUCCESS_TITLE,
  EDIT_BUREAU_EXCEPTION_ERROR,
  EDIT_BUREAU_EXCEPTION_ERROR_TITLE,
  EDIT_BUREAU_EXCEPTION_SUCCESS,
  EDIT_BUREAU_EXCEPTION_SUCCESS_TITLE,
} from 'Constants/SystemMessages';
import api from '../api';
import { toastError, toastSuccess } from './toast';
// import { convertQueryToString } from 'utilities';

const dummyData = [
  {
    Name: 'John Doe',
    BureauNames: ['OBO', 'ENR'],
    NameAbbreviation: 'JD',
  },
  {
    Name: 'Jane Smith',
    BureauNames: ['NEA', 'AF'],
    NameAbbreviation: 'JS',
  },
  {
    Name: 'Alice Johnson',
    BureauNames: ['SCA', 'IO'],
    NameAbbreviation: 'AJ',
  },
  {
    Name: 'Bob Anderson',
    BureauNames: ['BRM', 'EUR'],
    NameAbbreviation: 'BA',
  },
  {
    Name: 'Eve Williams',
    BureauNames: ['NEA', 'AF'],
    NameAbbreviation: 'EW',
  },
  {
    Name: 'Michael Brown',
    BureauNames: ['OBO', 'ENR'],
    NameAbbreviation: 'MB',
  },
  {
    Name: 'Sophia Lee',
    BureauNames: ['BVB', 'SCA'],
    NameAbbreviation: 'SL',
  },
  {
    Name: 'William Johnson',
    BureauNames: ['NEA', 'AF'],
    NameAbbreviation: 'WJ',
  },
  {
    Name: 'Olivia Davis',
    BureauNames: ['BRM', 'EUR'],
    NameAbbreviation: 'OD',
  },
  {
    Name: 'James Miller',
    BureauNames: ['NEA', 'AF'],
    NameAbbreviation: 'JM',
  },
  {
    Name: 'Ava Wilson',
    BureauNames: ['BDM', 'ESS'],
    NameAbbreviation: 'AW',
  },
  {
    Name: 'David Moore',
    BureauNames: ['BRM', 'EUR'],
    NameAbbreviation: 'DM',
  },
  {
    Name: 'Liam Taylor',
    BureauNames: ['NEA', 'AF'],
    NameAbbreviation: 'LT',
  },
  {
    Name: 'Emma Harris',
    BureauNames: ['OVO'],
    NameAbbreviation: 'EH',
  },
  {
    Name: 'Mia Martin',
    BureauNames: ['NEA', 'AF'],
    NameAbbreviation: 'MM',
  },
];

const dummyDataToReturn = (query) => new Promise((resolve) => {
  const { limit } = query;
  resolve({
    results: dummyData.slice(0, limit),
    count: dummyData.length,
    next: null,
    previous: null,
  });
});
const bureauExceptionPosDummyDataToReturn = (query) => new Promise((resolve) => {
  const { limit } = query;
  resolve({
    results: dummyData.slice(0, limit),
    count: dummyData.length,
    next: null,
    previous: null,
  });
});

export function bureauExceptionFetchDataErrored(bool) {
  return {
    type: 'BUREAU_EXCEPTION_FETCH_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function bureauExceptionFetchDataLoading(bool) {
  return {
    type: 'BUREAU_EXCEPTION_FETCH_IS_LOADING',
    isLoading: bool,
  };
}

export function bureauExceptionFetchDataSuccess(results) {
  return {
    type: 'BUREAU_EXCEPTIONS_FETCH_SUCCESS',
    results,
  };
}

export function bureauExceptionFetchData(query = {}) {
  return (dispatch) => {
    batch(() => {
      dispatch(bureauExceptionFetchDataLoading(true));
      dispatch(bureauExceptionFetchDataErrored(false));
    });
    // const q = convertQueryToString(query);
    // const endpoint = `sweet/new/endpoint/we/can/pass/a/query/to/?${q}`;
    // api().get(endpoint)
    dispatch(bureauExceptionFetchDataLoading(true));
    dummyDataToReturn(query)
      .then((data) => {
        batch(() => {
          dispatch(bureauExceptionFetchDataSuccess(data));
          dispatch(bureauExceptionFetchDataErrored(false));
          dispatch(bureauExceptionFetchDataLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(bureauExceptionFetchDataLoading(true));
            dispatch(bureauExceptionFetchDataErrored(false));
          });
        } else {
          batch(() => {
            dispatch(bureauExceptionFetchDataSuccess(dummyDataToReturn));
            dispatch(bureauExceptionFetchDataErrored(false));
            dispatch(bureauExceptionFetchDataLoading(false));
          });
        }
      });
  };
}

export function bureauExceptionSelectionsSaveSuccess(result) {
  return {
    type: 'BUREAU_EXCEPTION_SELECTIONS_SAVE_SUCCESS',
    result,
  };
}

export function saveBureauExceptionSelections(queryObject) {
  return (dispatch) => dispatch(bureauExceptionSelectionsSaveSuccess(queryObject));
}

export function bureauExceptionPositionSearchFetchDataErrored(bool) {
  return {
    type: 'BUREAU_EXCEPTION_POSITION_SEARCH_FETCH_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function bureauExceptionPositionSearchFetchDataLoading(bool) {
  return {
    type: 'BUREAU_EXCEPTION_POSITION_SEARCH_FETCH_IS_LOADING',
    isLoading: bool,
  };
}

export function bureauExceptionPositionSearchFetchDataSuccess(results) {
  return {
    type: 'BUREAU_EXCEPTION_POSITION_SEARCH_FETCH_SUCCESS',
    results,
  };
}

export function bureauExceptionPositionSearchFetchData(query = {}) {
  return (dispatch) => {
    batch(() => {
      dispatch(bureauExceptionPositionSearchFetchDataLoading(true));
      dispatch(bureauExceptionPositionSearchFetchDataErrored(false));
    });
    // const q = convertQueryToString(query);
    // const endpoint = `sweet/new/endpoint/we/can/pass/a/query/to/?${q}`;
    // api().get(endpoint)
    dispatch(bureauExceptionPositionSearchFetchDataLoading(true));
    bureauExceptionPosDummyDataToReturn(query)
      .then((data) => {
        batch(() => {
          dispatch(bureauExceptionPositionSearchFetchDataSuccess(data));
          dispatch(bureauExceptionPositionSearchFetchDataErrored(false));
          dispatch(bureauExceptionPositionSearchFetchDataLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(bureauExceptionPositionSearchFetchDataLoading(true));
            dispatch(bureauExceptionPositionSearchFetchDataErrored(false));
          });
        } else {
          batch(() => {
            dispatch(bureauExceptionPositionSearchFetchDataErrored(true));
            dispatch(bureauExceptionPositionSearchFetchDataLoading(false));
          });
        }
      });
  };
}

export function bureauExceptionPositionSearchSelectionsSaveSuccess(result) {
  return {
    type: 'BUREAU_EXCEPTION_POSITION_SEARCH_SELECTIONS_SAVE_SUCCESS',
    result,
  };
}

export function saveBureauExceptionPositionSearchSelections(queryObject) {
  return (dispatch) => dispatch(bureauExceptionPositionSearchSelectionsSaveSuccess(queryObject));
}

export function bureauExceptionPositionRemoveHasErrored(bool) {
  return {
    type: 'BUREAU_EXCEPTION_POSITION_REMOVE_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function bureauExceptionPositionRemoveIsLoading(bool) {
  return {
    type: 'BUREAU_EXCEPTION_POSITION_REMOVE_IS_LOADING',
    isLoading: bool,
  };
}
export function bureauExceptionPositionRemoveSuccess(data) {
  return {
    type: 'BUREAU_EXCEPTION_POSITION_REMOVE_SUCCESS',
    data,
  };
}

let cancel;

export function bureauExceptionPositionRemove(position) {
  return (dispatch) => {
    if (cancel) { cancel('cancel'); }
    dispatch(bureauExceptionPositionRemoveIsLoading(true));
    dispatch(bureauExceptionPositionRemoveHasErrored(false));
    api()
      .post('/placeholder/POST/endpoint', {
        position,
      }, {
        cancelToken: new CancelToken((c) => {
          cancel = c;
        }),
      })
      .then(({ data }) => {
        batch(() => {
          dispatch(bureauExceptionPositionRemoveHasErrored(false));
          dispatch(bureauExceptionPositionRemoveSuccess(data || []));
          dispatch(
            toastSuccess(ADD_BUREAU_EXCEPTION_SUCCESS,
              ADD_BUREAU_EXCEPTION_SUCCESS_TITLE));
          dispatch(bureauExceptionPositionRemoveIsLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          dispatch(bureauExceptionPositionRemoveHasErrored(false));
          dispatch(bureauExceptionPositionRemoveIsLoading(false));
        } else {
          dispatch(toastError(ADD_BUREAU_EXCEPTION_ERROR,
            ADD_BUREAU_EXCEPTION_ERROR_TITLE));
          dispatch(bureauExceptionPositionRemoveHasErrored(true));
          dispatch(bureauExceptionPositionRemoveIsLoading(false));
        }
      });
  };
}

export function bureauExceptionPositionEditHasErrored(bool) {
  return {
    type: 'BUREAU_EXCEPTION_POSITION_EDIT_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function bureauExceptionPositionEditIsLoading(bool) {
  return {
    type: 'BUREAU_EXCEPTION_POSITION_EDIT_IS_LOADING',
    isLoading: bool,
  };
}
export function bureauExceptionPositionEditSuccess(data) {
  return {
    type: 'BUREAU_EXCEPTION_POSITION_EDIT_SUCCESS',
    data,
  };
}

export function bureauExceptionPositionEdit(position, incumbent, status) {
  return (dispatch) => {
    if (cancel) { cancel('cancel'); }
    dispatch(bureauExceptionPositionEditIsLoading(true));
    dispatch(bureauExceptionPositionEditHasErrored(false));
    api()
      .post('/placeholder/POST/endpoint', {
        position,
        incumbent,
        status,
      }, {
        cancelToken: new CancelToken((c) => {
          cancel = c;
        }),
      })
      .then(({ data }) => {
        batch(() => {
          dispatch(bureauExceptionPositionEditHasErrored(false));
          dispatch(bureauExceptionPositionEditSuccess(data || []));
          dispatch(
            toastSuccess(EDIT_BUREAU_EXCEPTION_SUCCESS, EDIT_BUREAU_EXCEPTION_SUCCESS_TITLE));
          dispatch(bureauExceptionPositionEditIsLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          dispatch(bureauExceptionPositionEditHasErrored(false));
          dispatch(bureauExceptionPositionEditIsLoading(false));
        } else {
          dispatch(toastError(EDIT_BUREAU_EXCEPTION_ERROR,
            EDIT_BUREAU_EXCEPTION_ERROR_TITLE));
          dispatch(bureauExceptionPositionEditHasErrored(true));
          dispatch(bureauExceptionPositionEditIsLoading(false));
        }
      });
  };
}
