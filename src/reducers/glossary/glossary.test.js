import * as reducers from './glossary';

describe('reducers', () => {
  it('can set reducer GLOSSARY_HAS_ERRORED', () => {
    expect(reducers.glossaryHasErrored(false, { type: 'GLOSSARY_HAS_ERRORED', hasErrored: true })).toBe(true);
  });

  it('can set reducer GLOSSARY_IS_LOADING', () => {
    expect(reducers.glossaryIsLoading(false, { type: 'GLOSSARY_IS_LOADING', isLoading: true })).toBe(true);
  });

  it('can set reducer GLOSSARY_FETCH_DATA_SUCCESS', () => {
    expect(reducers.glossary([], { type: 'GLOSSARY_FETCH_DATA_SUCCESS', glossary: [1] }).length).toBe(1);
  });
});
