// import { stringify } from 'query-string';
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
  // eslint-disable-next-line no-console
  console.log('modifyPermissionIsLoading()');
  return {
    type: 'MODIFY_PERMISSION_IS_LOADING',
    isLoading: bool,
  };
}

export function modifyPermissionSuccess(results) {
  // eslint-disable-next-line no-console
  console.log('modifyPermissionSuccess(). results:', results);
  // now since the permission has been successfully updated,
  // we want to re-call getUsers
  getUsers();
  return {
    type: 'MODIFY_PERMISSION_SUCCESS',
    results,
  };
}

export function getTableStatsHasErrored(bool) {
  // eslint-disable-next-line no-console
  console.log('getTableStatsHasErrored()');
  return {
    type: 'GET_TABLE_STATS_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function getTableStatsIsLoading(bool) {
  // eslint-disable-next-line no-console
  console.log('getTableStatsIsLoading()');
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

/*
  DELEGATE_ROLES looks like this:
  const DELEGATE_ROLES = {
    superuser: { title: 'Super User', group_id: null, group_name: 'superuser' },
    glossary_editors: { title: 'Glossary Editor', group_id: null, group_name: 'glossary_editors' },
    aboutpage_editor: { title: 'About Page Editor', group_id: null, group_name: 'aboutpage_editor' }
  };
  results looks like this:
  results = [
    {id: 1, permissions: Array(0), name: "aboutpage_editor"},
    {id: 28, permissions: Array(0), name: "glossary_editors"},
    {id: 31, permissions: Array(0), name: "superuser"}
  ];
*/
  return {
    type: 'GET_TABLE_STATS_SUCCESS',
    results,
  };
}

export function getTableStats() {
  let apiURL = 'permission/group/?name__in=';

  // eslint-disable-next-line no-return-assign
  Object.keys(DELEGATE_ROLES).map(m => (
      apiURL += `${DELEGATE_ROLES[m].group_name}%2C`
  ));
  apiURL += '?';
  /*
    Steps:
          1. being called on load of Administrator page? YES
          2. calling delegate roles? YES
          3. properly building out API URL  api/v1/permission/group/?name_
              _in=superuser%2Cglossary_editors%2Caboutpage_editor? YES
          4. call to API successful? YES
          5. modify DELEGATE_ROLES to have group_id? YES
  */
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
    dispatch(modifyPermissionIsLoading(true));
    dispatch(modifyPermissionHasErrored(false));

    if (addPermission) {
      api().put(apiURL)
        .then((results) => {
          dispatch(modifyPermissionSuccess(results.data));
          dispatch(modifyPermissionIsLoading(false));
          dispatch(modifyPermissionHasErrored(false));
        })
        .catch(() => {
          dispatch(modifyPermissionIsLoading(false));
          dispatch(modifyPermissionHasErrored(true));
        });
    } else {
      api().delete(apiURL)
          .then((results) => {
            dispatch(modifyPermissionSuccess(results.data));
            dispatch(modifyPermissionIsLoading(false));
            dispatch(modifyPermissionHasErrored(false));
          })
          .catch(() => {
            dispatch(modifyPermissionIsLoading(false));
            dispatch(modifyPermissionHasErrored(true));
          });
    }
  };
}
