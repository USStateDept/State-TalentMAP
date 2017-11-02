import * as reducers from './missionAutocomplete';

describe('reducers', () => {
  it('can set reducer MISSION_SEARCH_HAS_ERRORED', () => {
    expect(reducers.missionSearchHasErrored(false, { type: 'MISSION_SEARCH_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer MISSION_SEARCH_IS_LOADING', () => {
    expect(reducers.missionSearchIsLoading(false, { type: 'MISSION_SEARCH_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer MISSION_SEARCH_FETCH_DATA_SUCCESS', () => {
    expect(reducers.missionSearchSuccess([], { type: 'MISSION_SEARCH_FETCH_DATA_SUCCESS', missions: ['test'] })[0]).toBe('test');
  });
});
