// ================= Panel Remarks: Create Panel Remarks =================
export function panelRemarksCreateHasErrored(state = false, action) {
  switch (action.type) {
    case 'PANEL_REMARKS_CREATE_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}

export function panelRemarksCreateIsLoading(state = false, action) {
  switch (action.type) {
    case 'PANEL_REMARKS_CREATE_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function panelRemarksCreateSuccess(state = false, action) {
  switch (action.type) {
    case 'PANEL_REMARKS_CREATE_SUCCESS':
      return action.success;
    default:
      return state;
  }
}

// ======= Panel Remarks: Update Panel Remarks =======
export function panelRemarksEditHasErrored(state = false, action) {
  switch (action.type) {
    case 'PANEL_REMARKS_EDIT_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}

export function panelRemarksEditIsLoading(state = false, action) {
  switch (action.type) {
    case 'PANEL_REMARKS_EDIT_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function panelRemarksEditSuccess(state = false, action) {
  switch (action.type) {
    case 'PANEL_REMARKS_EDIT_SUCCESS':
      return action.success;
    default:
      return state;
  }
}

// ======= Panel Remarks: Get Panel Remarks =======
export function panelRemarksFetchDataErrored(state = false, action) {
  switch (action.type) {
    case 'PANEL_REMARKS_FETCH_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}

export function panelRemarksFetchDataLoading(state = false, action) {
  switch (action.type) {
    case 'PANEL_REMARKS_FETCH_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

const initialState = {
  results: [],
};
export function panelRemarks(state = initialState, action) {
  switch (action.type) {
    case 'PANEL_REMARKS_FETCH_SUCCESS':
      return {
        results: action.results,
      };
    default:
      return state;
  }
}

// ================= Panel Remarks: Get Remark Categories =================
export function panelRemarksCategoriesFetchDataErrored(state = false, action) {
  switch (action.type) {
    case 'PANEL_REMARKS_CATEGORIES_FETCH_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}

export function panelRemarksCategoriesFetchDataLoading(state = false, action) {
  switch (action.type) {
    case 'PANEL_REMARKS_CATEGORIES_FETCH_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function panelRemarksCategories(state = [], action) {
  switch (action.type) {
    case 'PANEL_REMARKS_CATEGORIES_FETCH_SUCCESS':
      return action.results;
    default:
      return state;
  }
}
