import * as reducers from './assignment';

describe('assignment reducers', () => {
  it('can set reducer ASSIGNMENT_HAS_ERRORED', () => {
    expect(reducers.assignmentHasErrored(false, { type: 'ASSIGNMENT_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer ASSIGNMENT_IS_LOADING', () => {
    expect(reducers.assignmentIsLoading(false, { type: 'ASSIGNMENT_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer ASSIGNMENT_FETCH_DATA_SUCCESS', () => {
    expect(reducers.assignment({}, { type: 'ASSIGNMENT_FETCH_DATA_SUCCESS', assignment: true })).toBe(true);
  });
});
