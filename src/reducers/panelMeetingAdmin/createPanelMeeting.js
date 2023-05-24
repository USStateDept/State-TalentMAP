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
