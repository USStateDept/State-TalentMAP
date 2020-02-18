import queryString from 'query-string';
// import { subDays } from 'date-fns';
// import { get } from 'lodash';
import api from '../api';
import DELEGATE_ROLES from '../Constants/DelegateRoles';

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
  console.log('usersSuccess(results) | results:', results);
  return {
    type: 'USERS_SUCCESS',
    results,
  };
}

export function getUsers() {
  return (dispatch) => {
    dispatch(usersIsLoading(true));
    dispatch(usersHasErrored(false));
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

export function modifyPermissionHasErrored(bool) {
  // eslint-disable-next-line no-console
  console.log('modifyPermissionHasErrored()');
  return {
    type: 'MODIFY_PERMISSION_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function modifyPermissionIsLoading(bool) {
  return {
    type: 'MODIFY_PERMISSION_IS_LOADING',
    isLoading: bool,
  };
}

export function modifyPermissionSuccess(results) {
  getUsers();
  return {
    type: 'MODIFY_PERMISSION_SUCCESS',
    results,
  };
}

export function getTableStatsHasErrored(bool) {
  return {
    type: 'GET_TABLE_STATS_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function getTableStatsIsLoading(bool) {
  return {
    type: 'GET_TABLE_STATS_IS_LOADING',
    isLoading: bool,
  };
}

export function getTableStatsSuccess(results) {
   // eslint-disable-next-line no-return-assign
  results.map(m => (
      DELEGATE_ROLES[m.name].group_id = m.id
  ));

  return {
    type: 'GET_TABLE_STATS_SUCCESS',
    results,
  };
}

export function getTableStats() {
  const baseURL = 'permission/group/';
  const tableCols = [];
  Object.keys(DELEGATE_ROLES).map(m => (
      tableCols.push(DELEGATE_ROLES[m].group_name)
  ));
  const qString = queryString.stringify({ name__in: tableCols.join(',') });
  const apiURL = `${baseURL}?${qString}?`;

  // old URL for reference:
  // permission/group/?name__in=superuser%2Cglossary_editors%2Caboutpage_editor%2C?
  // new one missing %2C form the end of the string

  return (dispatch) => {
    dispatch(getTableStatsIsLoading(true));
    dispatch(getTableStatsHasErrored(false));
    api().get(apiURL)
        .then((data) => {
          dispatch(getTableStatsSuccess(data.data.results));
          dispatch(getTableStatsIsLoading(false));
          dispatch(getTableStatsHasErrored(false));
        })
        .catch(() => {
          dispatch(getTableStatsIsLoading(false));
          dispatch(getTableStatsHasErrored(true));
        });
  };
}


export function modifyPermission(addPermission, userID, groupID) {
  // eslint-disable-next-line no-console
  console.log('modifyPermission(addPermission', addPermission, ', userID', userID, ', groupID', groupID, ')');

  const apiURL = `permission/group/${groupID}/user/${userID}/`;

  return (dispatch) => {
    dispatch(modifyPermissionHasErrored(false));
    dispatch(modifyPermissionIsLoading(true));

    if (addPermission) {
      api().put(apiURL)
        .then(() => {
          dispatch(modifyPermissionSuccess(true));
          dispatch(modifyPermissionHasErrored(false));
          dispatch(modifyPermissionIsLoading(false));
        })
        .catch(() => {
          dispatch(modifyPermissionSuccess(false));
          dispatch(modifyPermissionHasErrored(true));
          dispatch(modifyPermissionIsLoading(false));
        });
    } else {
      api().delete(apiURL)
          .then(() => {
            dispatch(modifyPermissionSuccess(true));
            dispatch(modifyPermissionHasErrored(false));
            dispatch(modifyPermissionIsLoading(false));
          })
          .catch(() => {
            dispatch(modifyPermissionSuccess(false));
            dispatch(modifyPermissionHasErrored(true));
            dispatch(modifyPermissionIsLoading(false));
          });
    }
  };
}
