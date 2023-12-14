// ================ BIDDING TOOL ================

export function biddingToolFetchDataErrored(state = false, action) {
  switch (action.type) {
    case 'BIDDING_TOOL_FETCH_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function biddingToolFetchDataLoading(state = false, action) {
  switch (action.type) {
    case 'BIDDING_TOOL_FETCH_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function biddingTool(state = [], action) {
  switch (action.type) {
    case 'BIDDING_TOOL_FETCH_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

// ================ BIDDING TOOL LIST ================

export function biddingToolsFetchDataErrored(state = false, action) {
  switch (action.type) {
    case 'BIDDING_TOOLS_FETCH_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function biddingToolsFetchDataLoading(state = false, action) {
  switch (action.type) {
    case 'BIDDING_TOOLS_FETCH_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function biddingTools(state = [], action) {
  switch (action.type) {
    case 'BIDDING_TOOLS_FETCH_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

// ================ BIDDING TOOL DELETE ================

export function biddingToolDeleteErrored(state = false, action) {
  switch (action.type) {
    case 'BIDDING_TOOL_DELETE_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function biddingToolDeleteLoading(state = false, action) {
  switch (action.type) {
    case 'BIDDING_TOOL_DELETE_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function biddingToolDeleteSuccess(state = [], action) {
  switch (action.type) {
    case 'BIDDING_TOOL_DELETE_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

// ================ BIDDING TOOL EDIT ================

export function biddingToolEditErrored(state = false, action) {
  switch (action.type) {
    case 'BIDDING_TOOL_EDIT_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function biddingToolEditLoading(state = false, action) {
  switch (action.type) {
    case 'BIDDING_TOOL_EDIT_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function biddingToolEditSuccess(state = [], action) {
  switch (action.type) {
    case 'BIDDING_TOOL_EDIT_SUCCESS':
      return action.results;
    default:
      return state;
  }
}

// ================ BIDDING TOOL CREATE ================

export function biddingToolCreateErrored(state = false, action) {
  switch (action.type) {
    case 'BIDDING_TOOL_CREATE_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function biddingToolCreateLoading(state = false, action) {
  switch (action.type) {
    case 'BIDDING_TOOL_CREATE_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function biddingToolCreateSuccess(state = [], action) {
  switch (action.type) {
    case 'BIDDING_TOOL_CREATE_SUCCESS':
      return action.results;
    default:
      return state;
  }
}
