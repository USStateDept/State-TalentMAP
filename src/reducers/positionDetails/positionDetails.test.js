import { isEqual } from 'lodash';
import * as reducers from './positionDetails';

describe('reducers', () => {
  it('can set reducer POSITION_DETAILS_HAS_ERRORED', () => {
    expect(reducers.positionDetailsHasErrored(false, { type: 'POSITION_DETAILS_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer POSITION_DETAILS_IS_LOADING', () => {
    expect(reducers.positionDetailsIsLoading(false, { type: 'POSITION_DETAILS_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer POSITION_DETAILS_FETCH_DATA_SUCCESS', () => {
    expect(reducers.positionDetails([], { type: 'POSITION_DETAILS_FETCH_DATA_SUCCESS', positionDetails: true })).toBe(true);
  });

  it('can set reducer and merge changes for POSITION_DETAILS_PATCH_STATE when position exists', () => {
    const result = (reducers.positionDetails(
      [{ id: 1, prop: false, prop2: 2 }],
      { type: 'POSITION_DETAILS_PATCH_STATE', positionDetails: { id: 1, prop: true, prop3: 3 } },
    ));
    expect(isEqual(result, [{ id: 1, prop: true, prop2: 2, prop3: 3 }])).toBe(true);
  });

  it('can set reducer and merge changes for POSITION_DETAILS_PATCH_STATE when position does not exist', () => {
    const result = (reducers.positionDetails(
      [{ id: 2, prop: false, prop2: 2 }],
      { type: 'POSITION_DETAILS_PATCH_STATE', positionDetails: { id: 1, prop: true, prop3: 3 } },
    ));
    expect(isEqual(result, [{ id: 2, prop: false, prop2: 2 }, { id: 1, prop: true, prop3: 3 }]))
      .toBe(true);
  });
});
