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
  console.log(id);
  return (dispatch) => {
    api()
      .get(`/fsbid/assignment_history/${id ? `${id}/` : ''}`)
      .then(({ data }) => {
        dispatch(assignmentFetchDataSuccess(data));
        dispatch(assignmentIsLoading(false));
        dispatch(assignmentHasErrored(false));
      })
      .catch(() => {
        dispatch(assignmentHasErrored(true));
        dispatch(assignmentIsLoading(false));
      });
  };
}
