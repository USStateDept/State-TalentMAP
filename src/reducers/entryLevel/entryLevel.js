// ======= Entry Level: Edit Position =======
export function entryLevelEditErrored(state = false, action) {
  switch (action.type) {
    case 'ENTRY_LEVEL_EDIT_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function entryLevelEditLoading(state = false, action) {
  switch (action.type) {
    case 'ENTRY_LEVEL_EDIT_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function entryLevelEdit(state = {}, action) {
  switch (action.type) {
    case 'ENTRY_LEVEL_EDIT_SUCCESS':
      return action.success;
    default:
      return state;
  }
}

// ======= Entry Level: Get Positions =======
export function entryLevelFetchDataErrored(state = false, action) {
  switch (action.type) {
    case 'ENTRY_LEVEL_FETCH_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function entryLevelFetchDataLoading(state = false, action) {
  switch (action.type) {
    case 'ENTRY_LEVEL_FETCH_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
const initialState = {
  count: 0,
  results: [],
};
export function entryLevelPositions(state = initialState, action) {
  switch (action.type) {
    case 'ENTRY_LEVEL_FETCH_SUCCESS':
      return {
        count: action.data.count,
        results: action.data.results,
      };
    default:
      return state;
  }
}

// ======= Entry Level: User Filter Selections =======
export function entryLevelSelections(state = {}, action) {
  switch (action.type) {
    case 'ENTRY_LEVEL_SELECTIONS_SAVE_SUCCESS':
      return action.result;
    default:
      return state;
  }
}

// ======= Entry Level: Filters =======
export function entryLevelFiltersFetchDataErrored(state = false, action) {
  switch (action.type) {
    case 'ENTRY_LEVEL_FILTERS_FETCH_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function entryLevelFiltersFetchDataLoading(state = false, action) {
  switch (action.type) {
    case 'ENTRY_LEVEL_FILTERS_FETCH_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function entryLevelFilters(state = {}, action) {
  switch (action.type) {
    case 'ENTRY_LEVEL_FILTERS_FETCH_SUCCESS':
      return action.results;
    default:
      return state;
  }
}
