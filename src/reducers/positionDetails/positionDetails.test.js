import { isEqual } from 'lodash';
import * as reducers from './positionDetails';

describe('reducers', () => {
  it('sets reducer POSITION_DETAILS_HAS_ERRORED', () => {
    expect(reducers.positionDetailsHasErrored(false, { type: 'POSITION_DETAILS_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('sets reducer POSITION_DETAILS_IS_LOADING', () => {
    expect(reducers.positionDetailsIsLoading(false, { type: 'POSITION_DETAILS_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('sets reducer POSITION_DETAILS_FETCH_DATA_SUCCESS', () => {
    expect(reducers.positionDetails([], { type: 'POSITION_DETAILS_FETCH_DATA_SUCCESS', positionDetails: true })).toBe(true);
  });

  it('sets reducer and merge changes for POSITION_DETAILS_PATCH_STATE', () => {
    const result = (reducers.positionDetails(
      { id: 2, position: { id: 1, prop: false, prop2: true } },
      { type: 'POSITION_DETAILS_PATCH_STATE', positionDetails: { id: 2, prop: true, prop3: 3 } },
    ));
    expect(isEqual(
      result,
      { id: 2, position: { id: 2, prop: true, prop2: true, prop3: 3 } },
    )).toBe(true);
  });
});
