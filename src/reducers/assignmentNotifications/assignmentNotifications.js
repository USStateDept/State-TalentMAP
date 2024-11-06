// ================ GET NOTE CABLE ================

export function noteCableFetchDataErrored(state = false, action) {
  switch (action.type) {
    case 'NOTE_CABLE_FETCH_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function noteCableFetchDataLoading(state = false, action) {
  switch (action.type) {
    case 'NOTE_CABLE_FETCH_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function noteCableFetchData(state = {}, action) {
  switch (action.type) {
    case 'NOTE_CABLE_FETCH_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

// ================ GET CABLE ================

export function cableFetchDataErrored(state = false, action) {
  switch (action.type) {
    case 'CABLE_FETCH_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function cableFetchDataLoading(state = false, action) {
  switch (action.type) {
    case 'CABLE_FETCH_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function cableFetchData(state = {}, action) {
  switch (action.type) {
    case 'CABLE_FETCH_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

// ================ GET NOTE CABLE REF ================

export function noteCableRefFetchDataErrored(state = false, action) {
  switch (action.type) {
    case 'NOTE_CABLE_REF_FETCH_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function noteCableRefFetchDataLoading(state = false, action) {
  switch (action.type) {
    case 'NOTE_CABLE_REF_FETCH_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function noteCableRefFetchData(state = {}, action) {
  switch (action.type) {
    case 'NOTE_CABLE_REF_FETCH_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

// ================ GAL LOOKUP ================

export function getGalErrored(state = false, action) {
  switch (action.type) {
    case 'GAL_FETCH_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function getGalLoading(state = false, action) {
  switch (action.type) {
    case 'GAL_FETCH_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function getGal(state = [], action) {
  switch (action.type) {
    case 'GAL_FETCH_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

// ================ GET OPS WSDL ================

export function getOpsWsdlErrored(state = false, action) {
  switch (action.type) {
    case 'OPS_WSDL_FETCH_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function getOpsWsdlLoading(state = false, action) {
  switch (action.type) {
    case 'OPS_WSDL_FETCH_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function getOpsWsdl(state = [], action) {
  switch (action.type) {
    case 'OPS_WSDL_FETCH_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

// ================ GET OPS DATA ================

export function getOpsDataErrored(state = false, action) {
  switch (action.type) {
    case 'OPS_DATA_FETCH_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function getOpsDataLoading(state = false, action) {
  switch (action.type) {
    case 'OPS_DATA_FETCH_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function getOpsData(state = [], action) {
  switch (action.type) {
    case 'OPS_DATA_FETCH_SUCCESS':
      return action.results;
    default:
      return state;
  }
}
