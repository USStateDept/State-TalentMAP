// import { stringify } from 'query-string';
// import { subDays } from 'date-fns';
// import { get } from 'lodash';
import api from '../api';

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

export function modifyPermissionHasErrored(bool) {
  // eslint-disable-next-line no-console
  console.log('in modifyPermissionHasErrored');
  return {
    type: 'MODIFY_PERMISSION_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function modifyPermissionIsLoading(bool) {
  // eslint-disable-next-line no-console
  console.log('in modifyPermissionIsLoading');
  return {
    type: 'MODIFY_PERMISSION_IS_LOADING',
    isLoading: bool,
  };
}

export function modifyPermissionSuccess(results) {
  // eslint-disable-next-line no-console
  console.log('in modifyPermissionSuccess');
  // eslint-disable-next-line no-console
  console.log(results);
  // results.groups is where the permissions we want to check are.
  return {
    type: 'MODIFY_PERMISSION_SUCCESS',
    results,
  };
}


export function getUsers() {
  return (dispatch) => {
    dispatch(usersIsLoading(true));
    dispatch(usersHasErrored(false));
    // getting users
    // fetchUsers() old call to API placed in ()
    api().get('permission/user/all/')
        .then((results) => {
          console.log('in then');
          dispatch(usersSuccess(results.data.results));
          dispatch(usersIsLoading(false));
          dispatch(usersHasErrored(false));
        })
        .catch(() => {
          console.log('in then');
          dispatch(usersIsLoading(false));
          dispatch(usersHasErrored(true));
        });
  };
}

export function modifyPermission(addPermission, userID, groupID) {
  // eslint-disable-next-line no-console
  console.log('--modifyPermission in userRoles.js--');

  const apiURL = `permission/group/${groupID}/user/${userID}/`;

  // eslint-disable-next-line no-console
  console.log(apiURL);

  return (dispatch) => {
    dispatch(modifyPermissionIsLoading(true));
    dispatch(modifyPermissionHasErrored(false));

    api().put(apiURL)
        .then((results) => {
          dispatch(modifyPermissionSuccess(results));
          dispatch(modifyPermissionIsLoading(false));
          dispatch(modifyPermissionHasErrored(false));
        })
        .catch(() => {
          dispatch(modifyPermissionIsLoading(false));
          dispatch(modifyPermissionHasErrored(true));
        });
  };
}
