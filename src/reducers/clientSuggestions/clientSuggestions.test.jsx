import reducer, { INITIAL_STATE } from './clientSuggestions';

describe('reducers', () => {
  it('can set reducer SET_CLIENT_SUGGESTIONS', () => {
    expect(reducer(INITIAL_STATE, { type: 'SET_CLIENT_SUGGESTIONS',
      data: {
        hasErrored: true,
        other: 1,
      } })).toEqual({
      ...INITIAL_STATE,
      hasErrored: true,
      other: 1,
    });
  });

  it('can set reducer UNSET_CLIENT_SUGGESTIONS', () => {
    expect(reducer(INITIAL_STATE, { type: 'UNSET_CLIENT_SUGGESTIONS' })).toEqual(INITIAL_STATE);
  });
});
