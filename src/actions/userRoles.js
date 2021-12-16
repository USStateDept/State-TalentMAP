import queryString from 'query-string';
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
  return {
    type: 'USERS_SUCCESS',
    results,
  };
}

export function getUsers(page = 1, limit = 100, sort, filters, q_username, q_name) {
  const params = {
    page, limit, sort, filters, q_username, q_name,
  };
  // eslint-disable-next-line no-unused-vars
  const params$ = Object.fromEntries(Object.entries(params).filter(([k, v]) => Boolean(v)));
  const qString = queryString.stringify(params$);
  const fullURL = `permission/user/all/?${qString}`;
  return (dispatch) => {
    dispatch(usersIsLoading(true));
    dispatch(usersHasErrored(false));
    api().get(fullURL)
      .then((results) => {
        dispatch(usersSuccess(results.data));
        dispatch(usersHasErrored(false));
        dispatch(usersIsLoading(false));
      })
      .catch(() => {
        dispatch(usersHasErrored(true));
        dispatch(usersIsLoading(false));
      });
  };
}

export function modifyPermissionHasErrored(bool) {
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
  return {
    type: 'GET_TABLE_STATS_SUCCESS',
    results,
  };
}

export function getTableStats() {
  const baseURL = 'permission/group/';
  const tableCols = [];
  Object.keys(DELEGATE_ROLES).forEach(m => (
    tableCols.push(DELEGATE_ROLES[m].group_name)
  ));
  const qString = queryString.stringify({ name__in: tableCols.join(',') });
  const apiURL = `${baseURL}?${qString}`;

  return (dispatch) => {
    dispatch(getTableStatsIsLoading(true));
    dispatch(getTableStatsHasErrored(false));
    api().get(apiURL)
      .then((data) => {
        dispatch(getTableStatsSuccess(data.data.results));
        dispatch(getTableStatsHasErrored(false));
        dispatch(getTableStatsIsLoading(false));
      })
      .catch(() => {
        dispatch(getTableStatsHasErrored(true));
        dispatch(getTableStatsIsLoading(false));
      });
  };
}


export function modifyPermission(addPermission, userID, groupID) {
  const action = addPermission ? 'put' : 'delete';
  const apiURL = `permission/group/${groupID}/user/${userID}/`;

  return (dispatch) => {
    dispatch(modifyPermissionIsLoading(true));
    dispatch(modifyPermissionHasErrored(false));

    api()[action](apiURL)
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
  };
}
