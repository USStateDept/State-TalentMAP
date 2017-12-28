import * as reducers from './descriptionEdit';

describe('reducers', () => {
  it('can set reducer DESCRIPTION_EDIT_HAS_ERRORED', () => {
    expect(reducers.descriptionEditHasErrored(false, { type: 'DESCRIPTION_EDIT_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer DESCRIPTION_EDIT_IS_LOADING', () => {
    expect(reducers.descriptionEditIsLoading(false, { type: 'DESCRIPTION_EDIT_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer DESCRIPTION_EDIT_SUCCESS', () => {
    expect(reducers.descriptionEditSuccess(false, { type: 'DESCRIPTION_EDIT_SUCCESS', success: true })).toBe(true);
  });
});
