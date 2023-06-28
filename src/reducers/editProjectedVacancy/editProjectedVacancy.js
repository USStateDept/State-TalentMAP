export function editProjectedVacancyFetchDataErrored(state = false, action) {
  switch (action.type) {
    case 'EDIT_PROJECTED_VACANCY_FETCH_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function editProjectedVacancyFetchDataLoading(state = false, action) {
  switch (action.type) {
    case 'EDIT_PROJECTED_VACANCY_FETCH_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function editProjectedVacancy(state = {}, action) {
  switch (action.type) {
    case 'EDIT_PROJECTED_VACANCY_FETCH_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

export function editProjectedVacancySelections(state = {}, action) {
  switch (action.type) {
    case 'EDIT_PROJECTED_VACANCY_SELECTIONS_SAVE_SUCCESS':
      return action.result;
    default:
      return state;
  }
}

export function editProjectedVacancyFiltersFetchDataErrored(state = false, action) {
  switch (action.type) {
    case 'EDIT_PROJECTED_VACANCY_FILTERS_FETCH_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function editProjectedVacancyFiltersFetchDataLoading(state = false, action) {
  switch (action.type) {
    case 'EDIT_PROJECTED_VACANCY_FILTERS_FETCH_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function editProjectedVacancyFilters(state = {}, action) {
  switch (action.type) {
    case 'EDIT_PROJECTED_VACANCY_FILTERS_FETCH_SUCCESS':
      return action.results;
    default:
      return state;
  }
}
