// ======================== Create Panel Meeting ========================

export function createPanelMeetingHasErrored(state = false, action) {
  switch (action.type) {
    case 'CREATE_PANEL_MEETING_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}

export function createPanelMeetingIsLoading(state = false, action) {
  switch (action.type) {
    case 'CREATE_PANEL_MEETING_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function createPanelMeetingSuccess(state = [], action) {
  switch (action.type) {
    case 'CREATE_PANEL_MEETING_SUCCESS':
      return action.data;
    default:
      return state;
  }
}

// ======================== Run Panel Meeting ========================

export function runOfficialPreliminaryErrored(state = false, action) {
  switch (action.type) {
    case 'RUN_OFFICIAL_PRELIMINARY_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function runOfficialPreliminarySuccess(state = {}, action) {
  switch (action.type) {
    case 'RUN_OFFICIAL_PRELIMINARY_SUCCESS':
      return action.results;
    default:
      return state;
  }
}
export function runOfficialAddendumErrored(state = false, action) {
  switch (action.type) {
    case 'RUN_OFFICIAL_ADDENDUM_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function runOfficialAddendumSuccess(state = {}, action) {
  switch (action.type) {
    case 'RUN_OFFICIAL_ADDENDUM_SUCCESS':
      return action.results;
    default:
      return state;
  }
}
export function runPostPanelProcessingErrored(state = false, action) {
  switch (action.type) {
    case 'RUN_POST_PANEL_PROCESSING_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function runPostPanelProcessingSuccess(state = {}, action) {
  switch (action.type) {
    case 'RUN_POST_PANEL_PROCESSING_SUCCESS':
      return action.results;
    default:
      return state;
  }
}
