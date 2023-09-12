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
    id: 1,
    Name: 'John Doe',
    BureauNames: ['OBO', 'ENR'],
    NameAbbreviation: 'JD',
  },
  {
    id: 2,
    Name: 'Jane Smith',
    BureauNames: ['NEA', 'AF'],
    NameAbbreviation: 'JS',
  },
  {
    id: 3,
    Name: 'Alice Johnson',
    BureauNames: ['SCA', 'IO'],
    NameAbbreviation: 'AJ',
  },
  {
    id: 4,
    Name: 'Bob Anderson',
    BureauNames: ['BRM', 'EUR'],
    NameAbbreviation: 'BA',
  },
  {
    id: 5,
    Name: 'Eve Williams',
    BureauNames: ['NEA', 'AF'],
    NameAbbreviation: 'EW',
  },
  {
    id: 6,
    Name: 'Michael Brown',
    BureauNames: ['OBO', 'ENR'],
    NameAbbreviation: 'MB',
  },
  {
    id: 7,
    Name: 'Sophia Lee',
    BureauNames: ['BVB', 'SCA'],
    NameAbbreviation: 'SL',
  },
  {
    id: 8,
    Name: 'William Johnson',
    BureauNames: ['NEA', 'AF'],
    NameAbbreviation: 'WJ',
  },
  {
    id: 9,
    Name: 'Olivia Davis',
    BureauNames: ['BRM', 'EUR'],
    NameAbbreviation: 'OD',
  },
  {
    id: 10,
    Name: 'James Miller',
    BureauNames: ['NEA', 'AF'],
    NameAbbreviation: 'JM',
  },
  {
    id: 11,
    Name: 'Ava Wilson',
    BureauNames: ['BDM', 'ESS'],
    NameAbbreviation: 'AW',
  },
  {
    id: 12,
    Name: 'David Moore',
    BureauNames: ['BRM', 'EUR'],
    NameAbbreviation: 'DM',
  },
  {
    id: 13,
    Name: 'Liam Taylor',
    BureauNames: ['NEA', 'AF'],
    NameAbbreviation: 'LT',
  },
  {
    id: 14,
    Name: 'Emma Harris',
    BureauNames: ['OVO'],
    NameAbbreviation: 'EH',
  },
  {
    id: 15,
    Name: 'Mia Martin',
    BureauNames: ['NEA', 'AF'],
    NameAbbreviation: 'MM',
  },
];

const editDummyData = [
  { id: 1, bureaus: ['AO'] },
  { id: 2, bureaus: ['FA'] },
  { id: 3, bureaus: ['EO'] },
  { id: 4, bureaus: ['AS'] },
  { id: 5, bureaus: ['FG'] },
  { id: 6, bureaus: ['UO'] },
  { id: 7, bureaus: ['XA'] },
  { id: 8, bureaus: ['YY'] },
  { id: 9, bureaus: ['ZA'] },
  { id: 10, bureaus: ['OO'] },
  { id: 11, bureaus: ['RR'] },
  { id: 12, bureaus: ['BO'] },
  { id: 13, bureaus: ['FS'] },
  { id: 14, bureaus: ['FX'] },
  { id: 15, bureaus: ['UL'] },
  { id: 16, bureaus: ['BX'] },
  { id: 17, bureaus: ['FY'] },
  { id: 18, bureaus: ['ZW'] },
];

const dummyDataToReturn = (query) => new Promise((resolve) => {
  const { limit } = query;
  resolve({
    results: dummyData.slice(0, limit),
    count: dummyData.length,
  });
});
const bureauExceptionPosDummyDataToReturn = (query) => new Promise((resolve) => {
  const { limit } = query;
  resolve({
    results: editDummyData.slice(0, limit),
    count: editDummyData.length,
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

export function bureauExceptionEditFetchData(query = {}) {
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

export function bureauExceptionPositionEdit(user) {
  return (dispatch) => {
    if (cancel) { cancel('cancel'); }
    dispatch(bureauExceptionPositionEditIsLoading(true));
    dispatch(bureauExceptionPositionEditHasErrored(false));
    api()
      .post('/placeholder/POST/endpoint', {
        user,
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
