import reducer from './reducer';

describe('login reducers', () => {
  it('can set reducer LOGIN_REQUESTING', () => {
    expect(reducer(undefined, { type: 'LOGIN_REQUESTING', hasErrored: true }).requesting).toBe(true);
  });

  it('can set reducer LOGIN_SUCCESS', () => {
    expect(reducer(undefined, { type: 'LOGIN_SUCCESS', isLoading: true }).successful).toBe(true);
  });

  it('can set reducer LOGIN_ERROR', () => {
    expect(reducer({ errors: [503] }, { type: 'LOGIN_ERROR', post: true, error: 404 }).errors.length).toBeGreaterThan(0);
  });

  it('can set reducer LOGOUT_REQUESTING', () => {
    expect(reducer({ }, { type: 'LOGOUT_REQUESTING' }).successful).toBe(false);
  });

  it('can set reducer LOGOUT_SUCCESS', () => {
    expect(reducer({ }, { type: 'LOGOUT_SUCCESS' }).successful).toBe(true);
  });
});
