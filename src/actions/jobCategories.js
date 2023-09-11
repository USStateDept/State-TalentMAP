import { batch } from 'react-redux';
import { convertQueryToString } from 'utilities';
// eslint-disable-next-line no-unused-vars
import api from '../api';

// eslint-disable-next-line no-unused-vars
const dummyCategoryData =
  {
    QRY_LSTJOBCATS_REF: [
      {
        JC_ID: '17',
        JC_NM_TXT: 'Construction Engineers',
        JC_STS_IND: 'Active',
      },
      {
        JC_ID: '2',
        JC_NM_TXT: 'Consular',
        JC_STS_IND: 'Active',
      },
    ],
  };

// eslint-disable-next-line no-unused-vars
const dummyCategorySkillsData =
  {
    O_JC_ID: '2',
    O_JC_NM_TXT: 'Consular',
    O_JC_STS_IND: '1',
    O_JC_LAST_UPDT_TMSMP_DT: '20030807190449',
    O_JC_LAST_UPDT_USER_ID: 2,
    QRY_LSTSKILLS_REF: [
      {
        SKL_CODE: '0010',
        SKL_DESC: 'EXECUTIVE (PAS)',
        JCS_LAST_UPDT_USER_ID: 0,
        JCS_LAST_UPDT_TMSMP_DT: null,
        INCLUSION_IND: '0',
      },
      {
        SKL_CODE: '0020',
        SKL_DESC: 'EXECUTIVE (CAREER)',
        JCS_LAST_UPDT_USER_ID: 0,
        JCS_LAST_UPDT_TMSMP_DT: null,
        INCLUSION_IND: '0',
      },
      {
        SKL_CODE: '0060',
        SKL_DESC: 'MULTIFUNCTIONAL',
        JCS_LAST_UPDT_USER_ID: 0,
        JCS_LAST_UPDT_TMSMP_DT: null,
        INCLUSION_IND: '0',
      },
      {
        SKL_CODE: '2010',
        SKL_DESC: 'MANAGEMENT OFFICER',
        JCS_LAST_UPDT_USER_ID: 0,
        JCS_LAST_UPDT_TMSMP_DT: null,
        INCLUSION_IND: '0',
      },
      {
        SKL_CODE: '2050',
        SKL_DESC: 'INSPECTION (FUNCTIONAL)',
        JCS_LAST_UPDT_USER_ID: 0,
        JCS_LAST_UPDT_TMSMP_DT: null,
        INCLUSION_IND: '0',
      }],
  };

// eslint-disable-next-line no-unused-vars
const jobCategoriesAdminDummyDataToReturn = () => new Promise((resolve) => {
  resolve({
    results: dummyCategoryData,
    count: dummyCategoryData.length,
    next: null,
    previous: null,
  });
});

// eslint-disable-next-line no-unused-vars
const jobCategoriesFetchSkillsDataToReturn = () => new Promise((resolve) => {
  resolve({
    results: dummyCategorySkillsData,
    count: dummyCategorySkillsData.length,
    next: null,
    previous: null,
  });
});

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
    // const q = convertQueryToString();
    const endpoint = 'fsbid/job_categories/';
    // const ep = `${endpoint}?${q}`;
    api().get(endpoint)
    // jobCategoriesAdminDummyDataToReturn()
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
    const endpoint = `fsbid/job_categories/skills?${q}`;
    api().get(endpoint)
    // jobCategoriesFetchSkillsDataToReturn(query)
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
