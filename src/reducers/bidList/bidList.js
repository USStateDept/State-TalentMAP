import { get } from 'lodash';
import { mapBidData } from 'actions/bidList/helpers';

export function bidListHasErrored(state = false, action) {
  switch (action.type) {
    case 'BID_LIST_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function bidListIsLoading(state = false, action) {
  switch (action.type) {
    case 'BID_LIST_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function bidListFetchDataSuccess(state = { results: [] }, action) {
  switch (action.type) {
    case 'BID_LIST_FETCH_DATA_SUCCESS':
      return { results: mapBidData(get(action, 'results.results', [])) };
    default:
      return state;
  }
}
export function clientBidListHasErrored(state = false, action) {
  switch (action.type) {
    case 'CLIENT_BID_LIST_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function clientBidListIsLoading(state = false, action) {
  switch (action.type) {
    case 'CLIENT_BID_LIST_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function clientBidListFetchDataSuccess(state = { results: [] }, action) {
  switch (action.type) {
    case 'CLIENT_BID_LIST_FETCH_DATA_SUCCESS':
      return { results: mapBidData(get(action, 'results.results', [])) };
    default:
      return state;
  }
}
export function bidListToggleHasErrored(state = false, action) {
  switch (action.type) {
    case 'BID_LIST_TOGGLE_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function bidListToggleIsLoading(state = new Set(), action) {
  const newSet = new Set(state);
  switch (action.type) {
    case 'BID_LIST_TOGGLE_IS_LOADING':
      if (action.isLoading.bool) {
        newSet.add(action.isLoading.id);
        return newSet;
      }
      newSet.delete(action.isLoading.id);
      return newSet;
    default:
      return state;
  }
}

export function bidListToggleSuccess(state = false, action) {
  switch (action.type) {
    case 'BID_LIST_TOGGLE_SUCCESS':
      return action.response;
    default:
      return state;
  }
}
export function submitBidHasErrored(state = false, action) {
  switch (action.type) {
    case 'SUBMIT_BID_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function submitBidIsLoading(state = false, action) {
  switch (action.type) {
    case 'SUBMIT_BID_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function submitBidSuccess(state = false, action) {
  switch (action.type) {
    case 'SUBMIT_BID_SUCCESS':
      return action.response;
    default:
      return state;
  }
}
export function acceptBidHasErrored(state = false, action) {
  switch (action.type) {
    case 'ACCEPT_BID_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function acceptBidIsLoading(state = false, action) {
  switch (action.type) {
    case 'ACCEPT_BID_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function acceptBidSuccess(state = false, action) {
  switch (action.type) {
    case 'ACCEPT_BID_SUCCESS':
      return action.response;
    default:
      return state;
  }
}
export function declineBidHasErrored(state = false, action) {
  switch (action.type) {
    case 'DECLINE_BID_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function declineBidIsLoading(state = false, action) {
  switch (action.type) {
    case 'DECLINE_BID_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}
export function declineBidSuccess(state = false, action) {
  switch (action.type) {
    case 'DECLINE_BID_SUCCESS':
      return action.response;
    default:
      return state;
  }
}

