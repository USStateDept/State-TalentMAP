
export function jobCategoriesAdminFetchDataErrored(state = false, action) {
  switch (action.type) {
    case 'JOB_CATEGORIES_ADMIN_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function jobCategoriesAdminFetchDataIsLoading(state = false, action) {
  switch (action.type) {
    case 'JOB_CATEGORIES_ADMIN_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function jobCategoriesAdminFetchData(state = [], action) {
  switch (action.type) {
    case 'JOB_CATEGORIES_ADMIN_SUCCESS':
      return action.data;
    default:
      return state;
  }
}

export function jobCategoriesFetchSkillsHasErrored(state = false, action) {
  switch (action.type) {
    case 'JOB_CATEGORIES_SKILLS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function jobCategoriesFetchSkillsIsLoading(state = false, action) {
  switch (action.type) {
    case 'JOB_CATEGORIES_SKILLS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function jobCategoriesFetchSkills(state = [], action) {
  switch (action.type) {
    case 'JOB_CATEGORIES_SKILLS_SUCCESS':
      return action.data;
    default:
      return state;
  }
}
