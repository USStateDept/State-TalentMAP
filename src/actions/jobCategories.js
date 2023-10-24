import { batch } from 'react-redux';
import { convertQueryToString } from 'utilities';
import { CancelToken } from 'axios';
import {
  JOB_CATEGORIES_DELETE_ERROR,
  JOB_CATEGORIES_DELETE_ERROR_TITLE,
  JOB_CATEGORIES_DELETE_SUCCESS,
  JOB_CATEGORIES_DELETE_SUCCESS_TITLE,
  JOB_CATEGORIES_EDIT_ERROR,
  JOB_CATEGORIES_EDIT_ERROR_TITLE,
  JOB_CATEGORIES_EDIT_SUCCESS,
  JOB_CATEGORIES_EDIT_SUCCESS_TITLE,
  JOB_CATEGORIES_SAVE_NEW_ERROR,
  JOB_CATEGORIES_SAVE_NEW_ERROR_TITLE,
  JOB_CATEGORIES_SAVE_NEW_SUCCESS,
  JOB_CATEGORIES_SAVE_NEW_SUCCESS_TITLE,
} from 'Constants/SystemMessages';
import { toastError, toastSuccess } from './toast';
import api from '../api';

let cancelJobCategories;

export function jobCategoriesAdminFetchDataErrored(bool) {
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
    if (cancelJobCategories) {
      cancelJobCategories('cancel');
      dispatch(jobCategoriesAdminFetchDataIsLoading(true));
    }
    batch(() => {
      dispatch(jobCategoriesAdminFetchDataIsLoading(true));
      dispatch(jobCategoriesAdminFetchDataErrored(false));
    });
    const endpoint = '/fsbid/job_categories/';
    api().get(endpoint, {
      cancelToken: new CancelToken((c) => { cancelJobCategories = c; }),
    })
      .then((data) => {
        batch(() => {
          dispatch(jobCategoriesAdminFetchDataSuccess(data));
          dispatch(jobCategoriesAdminFetchDataErrored(false));
          dispatch(jobCategoriesAdminFetchDataIsLoading(false));
        });
      })
      .catch(() => {
        batch(() => {
          dispatch(jobCategoriesAdminFetchDataErrored(true));
          dispatch(jobCategoriesAdminFetchDataIsLoading(false));
        });
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
  return (dispatch) => {
    if (cancelJobCategories) {
      cancelJobCategories('cancel');
      dispatch(jobCategoriesFetchSkillsIsLoading(true));
    }
    batch(() => {
      dispatch(jobCategoriesFetchSkillsIsLoading(true));
      dispatch(jobCategoriesFetchSkillsHasErrored(false));
    });
    const q = convertQueryToString(query);
    const endpoint = `/fsbid/job_categories/skills/?${q}`;
    api().get(endpoint, {
      cancelToken: new CancelToken((c) => { cancelJobCategories = c; }),
    })
      .then((data) => {
        batch(() => {
          dispatch(jobCategoriesFetchSkillsSuccess(data));
          dispatch(jobCategoriesFetchSkillsHasErrored(false));
          dispatch(jobCategoriesFetchSkillsIsLoading(false));
        });
      })
      .catch(() => {
        batch(() => {
          dispatch(jobCategoriesFetchSkillsHasErrored(true));
          dispatch(jobCategoriesFetchSkillsIsLoading(false));
        });
      });
  };
}

export function jobCategoriesSaveNewCategory(data = {}) {
  return (dispatch) => {
    if (cancelJobCategories) {
      cancelJobCategories('cancel');
    }
    const endpoint = '/fsbid/job_categories/create';
    api().post(endpoint, data, {
      cancelToken: new CancelToken((c) => { cancelJobCategories = c; }),
    })
      .then(() => {
        batch(() => {
          dispatch(
            toastSuccess(
              JOB_CATEGORIES_SAVE_NEW_SUCCESS, JOB_CATEGORIES_SAVE_NEW_SUCCESS_TITLE,
            ));
          dispatch(jobCategoriesAdminFetchData());
        });
      })
      .catch(() => {
        batch(() => {
          dispatch(toastError(
            JOB_CATEGORIES_SAVE_NEW_ERROR, JOB_CATEGORIES_SAVE_NEW_ERROR_TITLE,
          ));
        });
      });
  };
}

export function jobCategoriesDeleteCategory(data = {}) {
  return (dispatch) => {
    if (cancelJobCategories) {
      cancelJobCategories('cancel');
    }
    const endpoint = '/fsbid/job_categories/delete';
    api().post(endpoint, data, {
      cancelToken: new CancelToken((c) => { cancelJobCategories = c; }),
    })
      .then(() => {
        batch(() => {
          dispatch(
            toastSuccess(
              JOB_CATEGORIES_DELETE_SUCCESS, JOB_CATEGORIES_DELETE_SUCCESS_TITLE,
            ));
          dispatch(jobCategoriesAdminFetchData());
        });
      })
      .catch(() => {
        dispatch(toastError(
          JOB_CATEGORIES_DELETE_ERROR, JOB_CATEGORIES_DELETE_ERROR_TITLE,
        ));
      });
  };
}

export function jobCategoriesEditCategory(data = {}) {
  return (dispatch) => {
    if (cancelJobCategories) {
      cancelJobCategories('cancel');
    }
    const endpoint = '/fsbid/job_categories/edit';
    api().post(endpoint, data, {
      cancelToken: new CancelToken((c) => { cancelJobCategories = c; }),
    })
      .then(() => {
        batch(() => {
          dispatch(
            toastSuccess(
              JOB_CATEGORIES_EDIT_SUCCESS, JOB_CATEGORIES_EDIT_SUCCESS_TITLE,
            ));
          dispatch(jobCategoriesFetchSkills({ category_id: data.category_id }));
        });
      })
      .catch(() => {
        batch(() => {
          dispatch(toastError(
            JOB_CATEGORIES_EDIT_ERROR, JOB_CATEGORIES_EDIT_ERROR_TITLE,
          ));
        });
      });
  };
}
