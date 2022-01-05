import * as reducers from './bidList';

describe('reducers', () => {
  it('can set reducer BID_LIST_HAS_ERRORED', () => {
    expect(reducers.bidListHasErrored(false, { type: 'BID_LIST_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer BID_LIST_IS_LOADING', () => {
    expect(reducers.bidListIsLoading(false, { type: 'BID_LIST_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer BID_LIST_FETCH_DATA_SUCCESS', () => {
    expect(reducers.bidListFetchDataSuccess(false,
      { type: 'BID_LIST_FETCH_DATA_SUCCESS', results: { results: [{ a: 1 }] } })).toEqual({ results: [{ a: 1 }] });
  });

  it('can set reducer BID_LIST_TOGGLE_HAS_ERRORED', () => {
    expect(reducers.bidListToggleHasErrored(false, { type: 'BID_LIST_TOGGLE_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer BID_LIST_TOGGLE_IS_LOADING to add an id', () => {
    expect(reducers.bidListToggleIsLoading(new Set(), { type: 'BID_LIST_TOGGLE_IS_LOADING', isLoading: { bool: true, id: 1 } })).toEqual(new Set([1]));
  });

  it('can set reducer BID_LIST_TOGGLE_IS_LOADING to remove an id', () => {
    expect(reducers.bidListToggleIsLoading(new Set(), { type: 'BID_LIST_TOGGLE_IS_LOADING', isLoading: { bool: false, id: 1 } })).toEqual(new Set());
  });

  it('can set reducer BID_LIST_TOGGLE_SUCCESS', () => {
    expect(reducers.bidListToggleSuccess(false, { type: 'BID_LIST_TOGGLE_SUCCESS', response: true })).toBe(true);
  });

  it('can set reducer SUBMIT_BID_HAS_ERRORED', () => {
    expect(reducers.submitBidHasErrored(false, { type: 'SUBMIT_BID_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer SUBMIT_BID_IS_LOADING', () => {
    expect(reducers.submitBidIsLoading(false, { type: 'SUBMIT_BID_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer SUBMIT_BID_SUCCESS', () => {
    expect(reducers.submitBidSuccess(false, { type: 'SUBMIT_BID_SUCCESS', response: true })).toBe(true);
  });

  it('can set reducer ACCEPT_BID_HAS_ERRORED', () => {
    expect(reducers.acceptBidHasErrored(false, { type: 'ACCEPT_BID_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer ACCEPT_BID_IS_LOADING', () => {
    expect(reducers.acceptBidIsLoading(false, { type: 'ACCEPT_BID_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer ACCEPT_BID_SUCCESS', () => {
    expect(reducers.acceptBidSuccess(false, { type: 'ACCEPT_BID_SUCCESS', response: true })).toBe(true);
  });

  it('can set reducer DECLINE_BID_HAS_ERRORED', () => {
    expect(reducers.declineBidHasErrored(false, { type: 'DECLINE_BID_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer DECLINE_BID_IS_LOADING', () => {
    expect(reducers.declineBidIsLoading(false, { type: 'DECLINE_BID_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer DECLINE_BID_SUCCESS', () => {
    expect(reducers.declineBidSuccess(false, { type: 'DECLINE_BID_SUCCESS', response: true })).toBe(true);
  });
});
