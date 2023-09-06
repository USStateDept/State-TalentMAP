import * as reducers from './assignmentMaintenance';

describe('assignment maintenance reducers', () => {
  it('can set reducer EDIT_ASSIGNMENT_HAS_ERRORED', () => {
    expect(reducers.editAssignmentHasErrored(false, { type: 'EDIT_ASSIGNMENT_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer EDIT_ASSIGNMENT_IS_LOADING', () => {
    expect(reducers.editAssignmentIsLoading(false, { type: 'EDIT_ASSIGNMENT_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer EDIT_ASSIGNMENT_SUCCESS', () => {
    expect(reducers.editAssignment({}, { type: 'EDIT_ASSIGNMENT_SUCCESS', editAssignment: true })).toBe(true);
  });

  it('can set reducer CREATE_ASSIGNMENT_HAS_ERRORED', () => {
    expect(reducers.createAssignmentHasErrored(false, { type: 'CREATE_ASSIGNMENT_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer CREATE_ASSIGNMENT_IS_LOADING', () => {
    expect(reducers.createAssignmentIsLoading(false, { type: 'CREATE_ASSIGNMENT_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer CREATE_ASSIGNMENT_SUCCESS', () => {
    expect(reducers.createAssignment({}, { type: 'CREATE_ASSIGNMENT_SUCCESS', createAssignment: true })).toBe(true);
  });
});
