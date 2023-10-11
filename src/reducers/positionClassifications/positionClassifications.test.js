import * as reducers from './positionClassifications';

describe('reducers', () => {
  it('can set reducer POSITION_CLASSIFICATIONS_HAS_ERRORED', () => {
    expect(
      reducers.positionClassificationsHasErrored(
        false,
        { type: 'POSITION_CLASSIFICATIONS_HAS_ERRORED', hasErrored: true }
      )
    ).toBe(true);
  });

  it('can set reducer POSITION_CLASSIFICATIONS_IS_LOADING', () => {
    expect(
      reducers.positionClassificationsIsLoading(
        false,
        { type: 'POSITION_CLASSIFICATIONS_IS_LOADING', isLoading: true }
      )
    ).toBe(true);
  });

  it('can set reducer POSITION_CLASSIFICATIONS_FETCH_DATA_SUCCESS', () => {
    expect(
      reducers.positionClassifications(
        { id: 2 },
        { type: 'POSITION_CLASSIFICATIONS_FETCH_DATA_SUCCESS', results: { id: 1 } }
      ).id
    ).toBe(1);
  });
});
