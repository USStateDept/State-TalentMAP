import * as reducers from './positionViews';

describe('reducers', () => {
  it('can set reducer POSITION_VIEWS_HAS_ERRORED to true', () => {
    expect(reducers.positionViewsHasErrored(false, { type: 'POSITION_VIEWS_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer POSITION_VIEWS_HAS_ERRORED to false', () => {
    expect(reducers.positionViewsHasErrored(true, { type: 'POSITION_VIEWS_HAS_ERRORED', hasErrored: false })).toBe(false);
  });

  it('can set reducer POSITION_VIEWS_HAS_ERRORED default', () => {
    expect(reducers.positionViewsHasErrored(false, { type: 'DEFAULT' })).toBe(false);
  });

  it('can set reducer POSITION_VIEWS_IS_LOADING to true', () => {
    expect(reducers.positionViewsIsLoading(false, { type: 'POSITION_VIEWS_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer POSITION_VIEWS_IS_LOADING to false', () => {
    expect(reducers.positionViewsIsLoading(false, { type: 'POSITION_VIEWS_IS_LOADING', isLoading: false })).toBe(false);
  });

  it('can set reducer POSITION_VIEWS_IS_LOADING default', () => {
    expect(reducers.positionViewsIsLoading(false, { type: 'DEFAULT', isLoading: false })).toBe(false);
  });

  it('can set reducer POSITION_VIEWS_SUCCESS', () => {
    expect(reducers.positionViews([], { type: 'POSITION_VIEWS_SUCCESS', count: 42 })).toBe(42);
  });

  it('can set reducer POSITION_VIEWS_SUCCESS default', () => {
    expect(reducers.positionViews([], { type: 'DEFAULT' })).toEqual([]);
  });
});
