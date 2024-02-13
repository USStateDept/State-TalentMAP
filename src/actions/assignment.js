import { batch } from 'react-redux';
import api from '../api';

export function assignmentHasErrored(bool) {
  return {
    type: 'ASSIGNMENT_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function assignmentIsLoading(bool) {
  return {
    type: 'ASSIGNMENT_IS_LOADING',
    isLoading: bool,
  };
}
export function assignmentFetchDataSuccess(assignment) {
  return {
    type: 'ASSIGNMENT_FETCH_DATA_SUCCESS',
    assignment,
  };
}

export function assignmentFetchData(id) {
  return (dispatch) => {
    batch(() => {
      dispatch(assignmentIsLoading(true));
      dispatch(assignmentHasErrored(false));
    });
    api()
      .get(`/fsbid/assignment_history/${id ? `${id}/` : ''}`)
      .then(({ data }) => {
        batch(() => {
          dispatch(assignmentFetchDataSuccess(data));
          dispatch(assignmentIsLoading(false));
          dispatch(assignmentHasErrored(false));
        });
      })
      .catch(() => {
        batch(() => {
          dispatch(assignmentHasErrored(true));
          dispatch(assignmentIsLoading(false));
        });
      });
  };
}
