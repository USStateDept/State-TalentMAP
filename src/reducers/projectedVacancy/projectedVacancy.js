// ================ GET LIST ================

export function projectedVacancyFetchDataErrored(state = false, action) {
  switch (action.type) {
    case 'PROJECTED_VACANCY_FETCH_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function projectedVacancyFetchDataLoading(state = false, action) {
  switch (action.type) {
    case 'PROJECTED_VACANCY_FETCH_LOADING':
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

// ================ EDIT FILTER SELECTIONS ================

export function projectedVacancySelections(state = {}, action) {
  switch (action.type) {
    case 'PROJECTED_VACANCY_SELECTIONS_SAVE_SUCCESS':
      return action.result;
    default:
      return state;
  }
}

// ================ GET FILTER DATA ================

export function projectedVacancyFiltersErrored(state = false, action) {
  switch (action.type) {
    case 'PROJECTED_VACANCY_FILTERS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function projectedVacancyFiltersLoading(state = false, action) {
  switch (action.type) {
    case 'PROJECTED_VACANCY_FILTERS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function projectedVacancyFilters(state = {}, action) {
  switch (action.type) {
    case 'PROJECTED_VACANCY_FILTERS_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

// ================ GET LANGUAGE OFFSET DATA ================

export function projectedVacancyLanguageOffsetsErrored(state = false, action) {
  switch (action.type) {
    case 'PROJECTED_VACANCY_LANGUAGE_OFFSETS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function projectedVacancyLanguageOffsetsLoading(state = false, action) {
  switch (action.type) {
    case 'PROJECTED_VACANCY_LANGUAGE_OFFSETS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function projectedVacancyLanguageOffsets(state = {}, action) {
  switch (action.type) {
    case 'PROJECTED_VACANCY_LANGUAGE_OFFSETS_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

// ================ EDIT ================

export function projectedVacancyEditErrored(state = false, action) {
  switch (action.type) {
    case 'PROJECTED_VACANCY_EDIT_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function projectedVacancyEditLoading(state = false, action) {
  switch (action.type) {
    case 'PROJECTED_VACANCY_EDIT_LOADING':
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

// ================ ADD TO PROPOSED CYCLE ================

export function projectedVacancyAddToProposedCycleErrored(state = false, action) {
  switch (action.type) {
    case 'PROJECTED_VACANCY_ADD_TO_PROPOSED_CYCLE_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function projectedVacancyAddToProposedCycleLoading(state = false, action) {
  switch (action.type) {
    case 'PROJECTED_VACANCY_ADD_TO_PROPOSED_CYCLE_LOADING':
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
