// ================ GET POSITIONS FOR FUNCTIONAL BUREAUS ================

export function functionalBureausErrored(state = false, action) {
  switch (action.type) {
    case 'FUNCTIONAL_BUREAUS_POSITIONS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function functionalBureausLoading(state = false, action) {
  switch (action.type) {
    case 'FUNCTIONAL_BUREAUS_POSITIONS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function functionalBureaus(state = {}, action) {
  switch (action.type) {
    case 'FUNCTIONAL_BUREAUS_POSITIONS_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

// ================ EDIT FUNCTIONAL BUREAUS FILTER SELECTIONS  ================

export function functionalBureausSelections(state = {}, action) {
  switch (action.type) {
    case 'FUNCTIONAL_BUREAUS_SELECTIONS_SAVE_SUCCESS':
      return action.result;
    default:
      return state;
  }
}
