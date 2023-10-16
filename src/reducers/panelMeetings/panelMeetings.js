// ======================== Panel Meeting List ========================

export function panelMeetingsFetchDataErrored(state = false, action) {
  switch (action.type) {
    case 'PANEL_MEETINGS_FETCH_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function panelMeetingsFetchDataLoading(state = false, action) {
  switch (action.type) {
    case 'PANEL_MEETINGS_FETCH_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function panelMeetings(state = {}, action) {
  switch (action.type) {
    case 'PANEL_MEETINGS_FETCH_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

// ======================== Panel Meeting Selections ========================

export function panelMeetingsSelections(state = {}, action) {
  switch (action.type) {
    case 'PANEL_MEETINGS_SELECTIONS_SAVE_SUCCESS':
      return action.result;
    default:
      return state;
  }
}

// ======================== Panel Meeting Filters ========================

export function panelMeetingsFiltersFetchDataErrored(state = false, action) {
  switch (action.type) {
    case 'PANEL_MEETINGS_FILTERS_FETCH_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function panelMeetingsFiltersFetchDataLoading(state = false, action) {
  switch (action.type) {
    case 'PANEL_MEETINGS_FILTERS_FETCH_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function panelMeetingsFilters(state = {}, action) {
  switch (action.type) {
    case 'PANEL_MEETINGS_FILTERS_FETCH_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

// ======================== Panel Meeting ========================

export function panelMeetingFetchDataErrored(state = false, action) {
  switch (action.type) {
    case 'PANEL_MEETING_FETCH_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function panelMeetingFetchDataLoading(state = false, action) {
  switch (action.type) {
    case 'PANEL_MEETING_FETCH_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function panelMeeting(state = {}, action) {
  switch (action.type) {
    case 'PANEL_MEETING_FETCH_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

// ======================== Panel Meeting Actions ========================

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
