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

// ================ GET LANGUAGE OFFSET OPTIONS ================

export function projectedVacancyLanguageOffsetOptionsErrored(state = false, action) {
  switch (action.type) {
    case 'PROJECTED_VACANCY_LANGUAGE_OFFSET_OPTIONS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function projectedVacancyLanguageOffsetOptionsLoading(state = false, action) {
  switch (action.type) {
    case 'PROJECTED_VACANCY_LANGUAGE_OFFSET_OPTIONS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function projectedVacancyLanguageOffsetOptions(state = {}, action) {
  switch (action.type) {
    case 'PROJECTED_VACANCY_LANGUAGE_OFFSET_OPTIONS_SUCCESS':
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

// ================ EDIT LANGUAGE OFFSETS ================

export function projectedVacancyEditLangOffsetsErrored(state = false, action) {
  switch (action.type) {
    case 'PROJECTED_VACANCY_EDIT_LANG_OFFSETS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function projectedVacancyEditLangOffsetsLoading(state = false, action) {
  switch (action.type) {
    case 'PROJECTED_VACANCY_EDIT_LANG_OFFSETS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function projectedVacancyEditLangOffsets(state = {}, action) {
  switch (action.type) {
    case 'PROJECTED_VACANCY_EDIT_LANG_OFFSETS_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

// ================ EDIT CAPSULE DESCRIPTION ================

export function projectedVacancyEditCapsuleDescErrored(state = false, action) {
  switch (action.type) {
    case 'PROJECTED_VACANCY_EDIT_CAPSULE_DESC_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function projectedVacancyEditCapsuleDescLoading(state = false, action) {
  switch (action.type) {
    case 'PROJECTED_VACANCY_EDIT_CAPSULE_DESC_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function projectedVacancyEditCapsuleDesc(state = {}, action) {
  switch (action.type) {
    case 'PROJECTED_VACANCY_EDIT_CAPSULE_DESC_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

// ================ GET METADATA ================

export function projectedVacancyMetadataErrored(state = false, action) {
  switch (action.type) {
    case 'PROJECTED_VACANCY_METADATA_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function projectedVacancyMetadataLoading(state = false, action) {
  switch (action.type) {
    case 'PROJECTED_VACANCY_METADATA_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function projectedVacancyMetadata(state = {}, action) {
  switch (action.type) {
    case 'PROJECTED_VACANCY_METADATA_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

// ================ GET LANGUAGE OFFSETS ================

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
