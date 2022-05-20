export function agendaEmployeesFetchDataErrored(state = false, action) {
  switch (action.type) {
    case 'AGENDA_EMPLOYEES_FETCH_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function agendaEmployeesFetchDataLoading(state = false, action) {
  switch (action.type) {
    case 'AGENDA_EMPLOYEES_FETCH_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function agendaEmployees(state = {}, action) {
  switch (action.type) {
    case 'AGENDA_EMPLOYEES_FETCH_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

export function agendaEmployeesSelections(state = {}, action) {
  switch (action.type) {
    case 'AGENDA_EMPLOYEES_SELECTIONS_SAVE_SUCCESS':
      return action.result;
    default:
      return state;
  }
}

export function agendaEmployeesFiltersFetchDataErrored(state = false, action) {
  switch (action.type) {
    case 'AGENDA_EMPLOYEES_FILTERS_FETCH_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function agendaEmployeesFiltersFetchDataLoading(state = false, action) {
  switch (action.type) {
    case 'AGENDA_EMPLOYEES_FILTERS_FETCH_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function agendaEmployeesFilters(state = {}, action) {
  switch (action.type) {
    case 'AGENDA_EMPLOYEES_FILTERS_FETCH_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

export function agendaEmployeesFetchProfileHasErrored(state = true, action) {
  switch (action.type) {
    case 'AGENDA_EMPLOYEES_FETCH_PROFILE_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
