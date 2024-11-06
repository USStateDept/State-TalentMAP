// ================ Bid Audit: Get List ================

export function bidAuditFetchDataErrored(state = false, action) {
  switch (action.type) {
    case 'BID_AUDIT_FETCH_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function bidAuditFetchDataLoading(state = false, action) {
  switch (action.type) {
    case 'BID_AUDIT_FETCH_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function bidAuditFetchData(state = [], action) {
  switch (action.type) {
    case 'BID_AUDIT_FETCH_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

// ================ Bid Audit: Get Cycles ================

export function bidAuditFetchCyclesLoading(state = false, action) {
  switch (action.type) {
    case 'BID_AUDIT_CYCLE_FETCH_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function bidAuditCycles(state = [], action) {
  switch (action.type) {
    case 'BID_AUDIT_CYCLE_FETCH_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

// ================ Bid Audit: Get In Category/At Grade ================

export function bidAuditSecondFetchDataErrored(state = false, action) {
  switch (action.type) {
    case 'BID_AUDIT_SECOND_FETCH_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function bidAuditSecondFetchDataLoading(state = false, action) {
  switch (action.type) {
    case 'BID_AUDIT_SECOND_FETCH_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function bidAuditSecondFetchData(state = {}, action) {
  switch (action.type) {
    case 'BID_AUDIT_SECOND_FETCH_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

// ================ Bid Audit: Get In Category/At Grade Modal Data ================

export function bidAuditSecondFetchModalDataErrored(state = false, action) {
  switch (action.type) {
    case 'BID_AUDIT_SECOND_FETCH_MODAL_DATA_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function bidAuditSecondFetchModalDataLoading(state = false, action) {
  switch (action.type) {
    case 'BID_AUDIT_SECOND_FETCH_MODAL_DATA_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function bidAuditSecondFetchModalData(state = {}, action) {
  switch (action.type) {
    case 'BID_AUDIT_SECOND_FETCH_MODAL_DATA_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

// ================ Bid Audit: Get Audit Data ================

export function bidAuditGetAuditFetchDataErrored(state = false, action) {
  switch (action.type) {
    case 'BID_AUDIT_GET_AUDIT_FETCH_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function bidAuditGetAuditFetchDataLoading(state = false, action) {
  switch (action.type) {
    case 'BID_AUDIT_GET_AUDIT_FETCH_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function bidAuditGetAuditFetchDataSuccess(state = {}, action) {
  switch (action.type) {
    case 'BID_AUDIT_GET_AUDIT_FETCH_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

// ================ Bid Audit: Get Postion HTF Data ================

export function bidAuditHTFFetchModalDataErrored(state = false, action) {
  switch (action.type) {
    case 'BID_AUDIT_HTF_FETCH_MODAL_DATA_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function bidAuditHTFFetchModalDataLoading(state = false, action) {
  switch (action.type) {
    case 'BID_AUDIT_HTF_FETCH_MODAL_DATA_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function bidAuditHTFFetchModalData(state = {}, action) {
  switch (action.type) {
    case 'BID_AUDIT_HTF_FETCH_MODAL_DATA_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

// ================ Bid Audit: Get MDS Data ================

export function bidAuditGetMDSFetchDataErrored(state = false, action) {
  switch (action.type) {
    case 'BID_AUDIT_GET_MDS_FETCH_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function bidAuditGetMDSFetchDataLoading(state = false, action) {
  switch (action.type) {
    case 'BID_AUDIT_GET_MDS_FETCH_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function bidAuditGetMDSFetchDataSuccess(state = {}, action) {
  switch (action.type) {
    case 'BID_AUDIT_GET_MDS_FETCH_SUCCESS':
      return action.results;
    default:
      return state;
  }
}
