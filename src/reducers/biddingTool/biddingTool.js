// ================ BIDDING TOOL ================

export function biddingToolFetchDataErrored(state = false, action) {
  switch (action.type) {
    case 'BIDDING_TOOL_FETCH_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function biddingToolFetchDataLoading(state = false, action) {
  switch (action.type) {
    case 'BIDDING_TOOL_FETCH_IS_LOADING':
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
    case 'BIDDING_TOOLS_FETCH_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function biddingToolsFetchDataLoading(state = false, action) {
  switch (action.type) {
    case 'BIDDING_TOOLS_FETCH_IS_LOADING':
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
    case 'BIDDING_TOOL_DELETE_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function biddingToolDeleteLoading(state = false, action) {
  switch (action.type) {
    case 'BIDDING_TOOL_DELETE_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function biddingToolDeleteSuccess(state = [], action) {
  switch (action.type) {
    case 'BIDDING_TOOL_DELETE_SUCCESS':
      return action.data;
    default:
      return state;
  }
}

// ================ BIDDING TOOL EDIT ================

export function biddingToolEditHasErrored(state = false, action) {
  switch (action.type) {
    case 'BIDDING_TOOL_EDIT_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function biddingToolEditIsLoading(state = false, action) {
  switch (action.type) {
    case 'BIDDING_TOOL_EDIT_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function biddingToolEditSuccess(state = [], action) {
  switch (action.type) {
    case 'BIDDING_TOOL_EDIT_SUCCESS':
      return action.data;
    default:
      return state;
  }
}

// ================ BIDDING TOOL CREATE ================

export function biddingToolCreateHasErrored(state = false, action) {
  switch (action.type) {
    case 'BIDDING_TOOL_CREATE_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function biddingToolCreateIsLoading(state = false, action) {
  switch (action.type) {
    case 'BIDDING_TOOL_CREATE_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function biddingToolCreateSuccess(state = [], action) {
  switch (action.type) {
    case 'BIDDING_TOOL_CREATE_SUCCESS':
      return action.data;
    default:
      return state;
  }
}
