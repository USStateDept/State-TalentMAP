
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

export function jobCategoriesSaveNewCatHasErrored(state = false, action) {
  switch (action.type) {
    case 'JOB_CATEGORIES_SAVE_NEW_CAT_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function jobCategoriesSaveNewCatIsLoading(state = false, action) {
  switch (action.type) {
    case 'JOB_CATEGORIES_SAVE_NEW_CAT_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function jobCategoriesSaveNewCatSuccess(state = [], action) {
  switch (action.type) {
    case 'JOB_CATEGORIES_SAVE_NEW_CAT_SUCCESS':
      return action.data;
    default:
      return state;
  }
}

export function jobCategoriesDeleteCatHasErrored(state = false, action) {
  switch (action.type) {
    case 'JOB_CATEGORIES_DELETE_CAT_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function jobCategoriesDeleteCatIsLoading(state = false, action) {
  switch (action.type) {
    case 'JOB_CATEGORIES_DELETE_CAT_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function jobCategoriesDeleteCatSuccess(state = [], action) {
  switch (action.type) {
    case 'JOB_CATEGORIES_DELETE_CAT_SUCCESS':
      return action.data;
    default:
      return state;
  }
}

export function jobCategoriesEditCatHasErrored(state = false, action) {
  switch (action.type) {
    case 'JOB_CATEGORIES_EDIT_CAT_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function jobCategoriesEditCatIsLoading(state = false, action) {
  switch (action.type) {
    case 'JOB_CATEGORIES_EDIT_CAT_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function jobCategoriesEditCatSuccess(state = [], action) {
  switch (action.type) {
    case 'JOB_CATEGORIES_EDIT_CAT_SUCCESS':
      return action.data;
    default:
      return state;
  }
}
