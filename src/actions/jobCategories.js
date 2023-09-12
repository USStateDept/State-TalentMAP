import { batch } from 'react-redux';
import { convertQueryToString } from 'utilities';
import api from '../api';

export function jobCategoriesAdminFetchDataHasErrored(bool) {
  return {
    type: 'JOB_CATEGORIES_ADMIN_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function jobCategoriesAdminFetchDataIsLoading(bool) {
  return {
    type: 'JOB_CATEGORIES_ADMIN_IS_LOADING',
    isLoading: bool,
  };
}
export function jobCategoriesAdminFetchDataSuccess(data) {
  return {
    type: 'JOB_CATEGORIES_ADMIN_SUCCESS',
    data,
  };
}
export function jobCategoriesAdminFetchData() {
  return (dispatch) => {
    batch(() => {
      dispatch(jobCategoriesAdminFetchDataIsLoading(true));
      dispatch(jobCategoriesAdminFetchDataHasErrored(false));
    });
    const endpoint = 'fsbid/job_categories/';
    api().get(endpoint)
      .then((data) => {
        console.log('***DATA***');
        console.log(data);
        console.log('***DATA***');
        batch(() => {
          dispatch(jobCategoriesAdminFetchDataSuccess(data));
          dispatch(jobCategoriesAdminFetchDataHasErrored(false));
          dispatch(jobCategoriesAdminFetchDataIsLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(jobCategoriesAdminFetchDataHasErrored(true));
            dispatch(jobCategoriesAdminFetchDataIsLoading(false));
          });
        } else {
          batch(() => {
            dispatch(jobCategoriesAdminFetchDataHasErrored(true));
            dispatch(jobCategoriesAdminFetchDataIsLoading(false));
          });
        }
      });
  };
}

export function jobCategoriesFetchSkillsHasErrored(bool) {
  return {
    type: 'JOB_CATEGORIES_SKILLS_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function jobCategoriesFetchSkillsIsLoading(bool) {
  return {
    type: 'JOB_CATEGORIES_SKILLS_IS_LOADING',
    isLoading: bool,
  };
}
export function jobCategoriesFetchSkillsSuccess(data) {
  return {
    type: 'JOB_CATEGORIES_SKILLS_SUCCESS',
    data,
  };
}
export function jobCategoriesFetchSkills(query = {}) {
  console.log('query: ', query);
  return (dispatch) => {
    batch(() => {
      dispatch(jobCategoriesFetchSkillsIsLoading(true));
      dispatch(jobCategoriesFetchSkillsHasErrored(false));
    });
    const q = convertQueryToString(query);
    const endpoint = `fsbid/job_categories/skills?${q}`;
    api().get(endpoint)
      .then((data) => {
        batch(() => {
          dispatch(jobCategoriesFetchSkillsSuccess(data));
          dispatch(jobCategoriesFetchSkillsHasErrored(false));
          dispatch(jobCategoriesFetchSkillsIsLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(jobCategoriesFetchSkillsHasErrored(true));
            dispatch(jobCategoriesFetchSkillsIsLoading(false));
          });
        } else {
          batch(() => {
            dispatch(jobCategoriesFetchSkillsHasErrored(true));
            dispatch(jobCategoriesFetchSkillsIsLoading(false));
          });
        }
      });
  };
}
