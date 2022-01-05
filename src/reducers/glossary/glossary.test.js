import * as reducers from './glossary';

describe('GET reducers', () => {
  it('can set reducer GLOSSARY_HAS_ERRORED', () => {
    expect(reducers.glossaryHasErrored(false, { type: 'GLOSSARY_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer GLOSSARY_IS_LOADING', () => {
    expect(reducers.glossaryIsLoading(false, { type: 'GLOSSARY_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer GLOSSARY_FETCH_DATA_SUCCESS', () => {
    expect(reducers.glossary([], { type: 'GLOSSARY_FETCH_DATA_SUCCESS', glossary: [1] }).length).toBe(1);
  });

  it('can set reducer GLOSSARY_EDITOR_HAS_ERRORED', () => {
    expect(reducers.glossaryEditorHasErrored(false, { type: 'GLOSSARY_EDITOR_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer GLOSSARY_EDITOR_IS_LOADING', () => {
    expect(reducers.glossaryEditorIsLoading(false, { type: 'GLOSSARY_EDITOR_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer GLOSSARY_EDITOR_FETCH_DATA_SUCCESS', () => {
    expect(reducers.glossaryEditor([], { type: 'GLOSSARY_EDITOR_FETCH_DATA_SUCCESS', glossary: [1] }).length).toBe(1);
  });
});

describe('PATCH reducers', () => {
  it('can set reducer GLOSSARY_PATCH_HAS_ERRORED', () => {
    const state = {
      type: 'GLOSSARY_PATCH_HAS_ERRORED',
      value: {
        id: 1,
        message: 'error',
        hasErrored: true,
      },
    };

    expect(reducers.glossaryPatchHasErrored({}, state)).toBe(state.value);
  });

  it('can set reducer GLOSSARY_PATCH_IS_LOADING', () => {
    expect(reducers.glossaryPatchIsLoading(false, { type: 'GLOSSARY_PATCH_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer GLOSSARY_PATCH_SUCCESS', () => {
    expect(reducers.glossaryPatchSuccess({}, { type: 'GLOSSARY_PATCH_SUCCESS', success: { id: 1, success: true } }).success).toBe(true);
  });
});

describe('POST reducers', () => {
  it('can set reducer GLOSSARY_POST_HAS_ERRORED', () => {
    const state = {
      type: 'GLOSSARY_POST_HAS_ERRORED',
      value: {
        message: 'error',
        hasErrored: true,
      },
    };

    expect(reducers.glossaryPostHasErrored({}, state)).toBe(state.value);
  });

  it('can set reducer GLOSSARY_POST_IS_LOADING', () => {
    expect(reducers.glossaryPostIsLoading(false, { type: 'GLOSSARY_POST_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer GLOSSARY_POST_SUCCESS', () => {
    expect(reducers.glossaryPostSuccess({}, { type: 'GLOSSARY_POST_SUCCESS', success: { id: 1, success: true } }).success).toBe(true);
  });
});
