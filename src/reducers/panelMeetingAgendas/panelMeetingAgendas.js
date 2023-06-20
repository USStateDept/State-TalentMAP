export function panelMeetingAgendasFetchDataErrored(state = false, action) {
  switch (action.type) {
    case 'PANEL_MEETING_AGENDAS_FETCH_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function panelMeetingAgendasFetchDataLoading(state = false, action) {
  switch (action.type) {
    case 'PANEL_MEETING_AGENDAS_FETCH_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function panelMeetingAgendas(state = [], action) {
  switch (action.type) {
    case 'PANEL_MEETING_AGENDAS_FETCH_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

export function panelMeetingAgendasSelections(state = {}, action) {
  switch (action.type) {
    case 'PANEL_MEETING_AGENDAS_SELECTIONS_SAVE_SUCCESS':
      return action.result;
    default:
      return state;
  }
}

export function selectedEditPanelMeeting(state = {}, action) {
  switch (action.type) {
    case 'SELECTED_EDIT_PANEL_MEETING_SUCCESS':
      return action.result;
    default:
      return state;
  }
}

export function selectedEditPanelMeetingErrored(state = false, action) {
  switch (action.type) {
    case 'SELECTED_EDIT_PANEL_MEETING_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}

export function selectedEditPanelMeetingIsLoading(state = false, action) {
  switch (action.type) {
    case 'SELECTED_EDIT_PANEL_MEETING_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
