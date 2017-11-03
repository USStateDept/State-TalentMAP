import axios from 'axios';
import { fetchUserToken } from '../utilities';
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

// include an optional bypass for when we want to silently update the profile
export function assignmentFetchData() {
  return (dispatch) => {
    axios.get(`${api}/profile/assignments/`, { headers: { Authorization: fetchUserToken() } })
            .then(({ data }) => data.results[0] || {})
            .then((assignment) => {
              dispatch(assignmentFetchDataSuccess(assignment));
              dispatch(assignmentIsLoading(false));
              dispatch(assignmentHasErrored(false));
            })
            .catch(() => dispatch(assignmentHasErrored(true)));
  };
}
