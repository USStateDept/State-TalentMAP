import clientViewAs, { INITIAL_STATE } from './clientView';

describe('clientView reducer', () => {
  it('can set reducer SET_CLIENT_VIEW_AS', () => {
    expect(clientViewAs(INITIAL_STATE, { type: 'SET_CLIENT_VIEW_AS', config: { isLoading: true } }).isLoading).toBe(true);
  });

  it('can set reducer UNSET_CLIENT_VIEW', () => {
    expect(clientViewAs({ ...INITIAL_STATE, isLoading: true }, { type: 'UNSET_CLIENT_VIEW' })).toEqual(INITIAL_STATE);
  });
});
