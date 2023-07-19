export function projectedVacancyAddToProposedCycleErrored(state = false, action) {
  switch (action.type) {
    case 'PROJECTED_VACANCY_ADD_TO_PROPOSED_CYCLE_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function projectedVacancyAddToProposedCycleLoading(state = false, action) {
  switch (action.type) {
    case 'PROJECTED_VACANCY_ADD_TO_PROPOSED_CYCLE_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function projectedVacancyAddToProposedCycle(state = {}, action) {
  switch (action.type) {
    case 'PROJECTED_VACANCY_ADD_TO_PROPOSED_CYCLE_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

export function projectedVacancyEditErrored(state = false, action) {
  switch (action.type) {
    case 'PROJECTED_VACANCY_EDIT_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function projectedVacancyEditLoading(state = false, action) {
  switch (action.type) {
    case 'PROJECTED_VACANCY_EDIT_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function projectedVacancyEdit(state = {}, action) {
  switch (action.type) {
    case 'PROJECTED_VACANCY_EDIT_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

export function projectedVacancyFetchDataErrored(state = false, action) {
  switch (action.type) {
    case 'PROJECTED_VACANCY_FETCH_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function projectedVacancyFetchDataLoading(state = false, action) {
  switch (action.type) {
    case 'PROJECTED_VACANCY_FETCH_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function projectedVacancy(state = {}, action) {
  switch (action.type) {
    case 'PROJECTED_VACANCY_FETCH_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

export function projectedVacancySelections(state = {}, action) {
  switch (action.type) {
    case 'PROJECTED_VACANCY_SELECTIONS_SAVE_SUCCESS':
      return action.result;
    default:
      return state;
  }
}

export function projectedVacancyFiltersFetchDataErrored(state = false, action) {
  switch (action.type) {
    case 'PROJECTED_VACANCY_FILTERS_FETCH_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function projectedVacancyFiltersFetchDataLoading(state = false, action) {
  switch (action.type) {
    case 'PROJECTED_VACANCY_FILTERS_FETCH_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function projectedVacancyFilters(state = {}, action) {
  switch (action.type) {
    case 'PROJECTED_VACANCY_FILTERS_FETCH_SUCCESS':
      return action.results;
    default:
      return state;
  }
}
