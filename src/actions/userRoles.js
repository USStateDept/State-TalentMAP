// import { stringify } from 'query-string';
// import { subDays } from 'date-fns';
// import { get } from 'lodash';
import api from '../api';

// export const getTitle = (string = '', isUnique =
// false) => `${isUnique ? 'Unique' : 'Total'} logins in the past ${string}`;
export function fetchPermissions(id) {
  const url = `permission/user/${id}/`;
  // eslint-disable-next-line no-console
  console.log('url: ', url);
  return (
      api().get(url)
          .then(({ data }) => data)
          .then(client => client)
          .catch(error => error)
  );
}


export function usersHasErrored(bool) {
  return {
    type: 'USERS_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function usersIsLoading(bool) {
  return {
    type: 'USERS_IS_LOADING',
    isLoading: bool,
  };
}

export function usersSuccess(results) {
  // eslint-disable-next-line no-console
  console.log('in usersSuccess');
  // eslint-disable-next-line no-console
  console.log(results);
  // results.groups is where the permissions we want to check are.
  return {
    type: 'USERS_SUCCESS',
    results,
  };
}

/* export const fetchUsers = () => {
  const url = 'permission/user/all/';
  return (
      api().get(url)
          .then(({ data }) => data)
          .then(client => client)
          .catch(error => error)
  );
}; */

export function getUsers() {
  return (dispatch) => {
    dispatch(usersIsLoading(true));
    dispatch(usersHasErrored(false));
    // getting users
    // fetchUsers() old call to API placed in ()
    api().get('permission/user/all/')
        .then((results) => {
          dispatch(usersSuccess(results.data.results));
          dispatch(usersIsLoading(false));
          dispatch(usersHasErrored(false));
        })
        .catch(() => {
          dispatch(usersIsLoading(false));
          dispatch(usersHasErrored(true));
        });
  };
}
