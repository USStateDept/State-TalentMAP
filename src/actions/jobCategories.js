import { batch } from 'react-redux';
import { convertQueryToString } from 'utilities';
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
    const endpoint = '/fsbid/job_categories/';
    api().get(endpoint)
      .then((data) => {
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
  return (dispatch) => {
    batch(() => {
      dispatch(jobCategoriesFetchSkillsIsLoading(true));
      dispatch(jobCategoriesFetchSkillsHasErrored(false));
    });
    const q = convertQueryToString(query);
    const endpoint = `/fsbid/job_categories/skills?${q}`;
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

export function jobCategoriesSaveNewCatHasErrored(bool) {
  return {
    type: 'JOB_CATEGORIES_SAVE_NEW_CAT_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function jobCategoriesSaveNewCatIsLoading(bool) {
  return {
    type: 'JOB_CATEGORIES_SAVE_NEW_CAT_IS_LOADING',
    isLoading: bool,
  };
}
export function jobCategoriesSaveNewCatSuccess(data) {
  return {
    type: 'JOB_CATEGORIES_SAVE_NEW_CAT_SUCCESS',
    data,
  };
}
export function jobCategoriesSaveNewCategory(data = {}) {
  return (dispatch) => {
    batch(() => {
      dispatch(jobCategoriesSaveNewCatIsLoading(true));
      dispatch(jobCategoriesSaveNewCatHasErrored(false));
    });
    const endpoint = '/fsbid/job_categories/create';
    api().post(endpoint, data)
      .then(() => {
        batch(() => {
          dispatch(jobCategoriesSaveNewCatSuccess());
          dispatch(
            toastSuccess(
              JOB_CATEGORIES_SAVE_NEW_SUCCESS, JOB_CATEGORIES_SAVE_NEW_SUCCESS_TITLE,
            ));
          dispatch(jobCategoriesSaveNewCatHasErrored(false));
          dispatch(jobCategoriesSaveNewCatIsLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(jobCategoriesSaveNewCatHasErrored(true));
            dispatch(toastError(
              JOB_CATEGORIES_SAVE_NEW_ERROR, JOB_CATEGORIES_SAVE_NEW_ERROR_TITLE,
            ));
            dispatch(jobCategoriesSaveNewCatIsLoading(false));
          });
        } else {
          batch(() => {
            dispatch(jobCategoriesSaveNewCatHasErrored(true));
            dispatch(toastError(
              JOB_CATEGORIES_SAVE_NEW_ERROR, JOB_CATEGORIES_SAVE_NEW_ERROR_TITLE,
            ));
            dispatch(jobCategoriesSaveNewCatIsLoading(false));
          });
        }
      });
  };
}

export function jobCategoriesDeleteCatHasErrored(bool) {
  return {
    type: 'JOB_CATEGORIES_DELETE_CAT_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function jobCategoriesDeleteCatIsLoading(bool) {
  return {
    type: 'JOB_CATEGORIES_DELETE_CAT_IS_LOADING',
    isLoading: bool,
  };
}
export function jobCategoriesDeleteCatSuccess(result) {
  return {
    type: 'JOB_CATEGORIES_DELETE_CAT_SUCCESS',
    result,
  };
}
export function jobCategoriesDeleteCategory(data = {}) {
  return (dispatch) => {
    batch(() => {
      dispatch(jobCategoriesDeleteCatIsLoading(true));
      dispatch(jobCategoriesDeleteCatHasErrored(false));
    });
    const endpoint = '/fsbid/job_categories/delete';
    api().post(endpoint, data)
      .then(() => {
        batch(() => {
          dispatch(jobCategoriesDeleteCatSuccess());
          dispatch(
            toastSuccess(
              JOB_CATEGORIES_DELETE_SUCCESS, JOB_CATEGORIES_DELETE_SUCCESS_TITLE,
            ));
          dispatch(jobCategoriesDeleteCatHasErrored(false));
          dispatch(jobCategoriesDeleteCatIsLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(jobCategoriesDeleteCatHasErrored(true));
            dispatch(toastError(
              JOB_CATEGORIES_DELETE_ERROR, JOB_CATEGORIES_DELETE_ERROR_TITLE,
            ));
            dispatch(jobCategoriesDeleteCatIsLoading(false));
          });
        } else {
          batch(() => {
            dispatch(jobCategoriesDeleteCatHasErrored(true));
            dispatch(toastError(
              JOB_CATEGORIES_DELETE_ERROR, JOB_CATEGORIES_DELETE_ERROR_TITLE,
            ));
            dispatch(jobCategoriesDeleteCatIsLoading(false));
          });
        }
      });
  };
}

export function jobCategoriesEditCatHasErrored(bool) {
  return {
    type: 'JOB_CATEGORIES_EDIT_CAT_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function jobCategoriesEditCatIsLoading(bool) {
  return {
    type: 'JOB_CATEGORIES_EDIT_CAT_IS_LOADING',
    isLoading: bool,
  };
}
export function jobCategoriesEditCatSuccess(result) {
  return {
    type: 'JOB_CATEGORIES_EDIT_CAT_SUCCESS',
    result,
  };
}

export function jobCategoriesEditCategory(data = {}) {
  return (dispatch) => {
    batch(() => {
      dispatch(jobCategoriesEditCatIsLoading(true));
      dispatch(jobCategoriesEditCatHasErrored(false));
    });
    const endpoint = '/fsbid/job_categories/edit';
    api().post(endpoint, data)
      .then(() => {
        batch(() => {
          dispatch(jobCategoriesEditCatSuccess());
          dispatch(
            toastSuccess(
              JOB_CATEGORIES_EDIT_SUCCESS, JOB_CATEGORIES_EDIT_SUCCESS_TITLE,
            ));
          dispatch(jobCategoriesEditCatHasErrored(false));
          dispatch(jobCategoriesEditCatIsLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(jobCategoriesEditCatHasErrored(true));
            dispatch(toastError(
              JOB_CATEGORIES_EDIT_ERROR, JOB_CATEGORIES_EDIT_ERROR_TITLE,
            ));
            dispatch(jobCategoriesEditCatIsLoading(false));
          });
        } else {
          batch(() => {
            dispatch(jobCategoriesEditCatHasErrored(true));
            dispatch(toastError(
              JOB_CATEGORIES_EDIT_ERROR, JOB_CATEGORIES_EDIT_ERROR_TITLE,
            ));
            dispatch(jobCategoriesEditCatIsLoading(false));
          });
        }
      });
  };
}
