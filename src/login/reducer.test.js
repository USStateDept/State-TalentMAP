import reducer from './reducer';

describe('login reducers', () => {
  it('can set reducer LOGIN_REQUESTING', () => {
    const result = reducer(undefined, { type: 'LOGIN_REQUESTING', hasErrored: true });
    expect(result.requesting).toBe(true);
    expect(result.loggedIn).toBe(false);
  });

  it('can set reducer LOGIN_SUCCESS', () => {
    const result = reducer(undefined, { type: 'LOGIN_SUCCESS', isLoading: true });
    expect(result.successful).toBe(true);
    expect(result.requesting).toBe(false);
    expect(result.loggedIn).toBe(true);
  });

  it('can set reducer LOGIN_ERROR', () => {
    const result = reducer({ errors: [503] }, { type: 'LOGIN_ERROR', post: true, error: 404 });
    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.loggedIn).toBe(false);
    expect(result.requesting).toBe(false);
    expect(result.loggedIn).toBe(false);
  });

  it('can set reducer LOGOUT_REQUESTING', () => {
    const result = reducer({ }, { type: 'LOGOUT_REQUESTING' });
    expect(result.successful).toBe(false);
    expect(result.requesting).toBe(true);
    expect(result.loggedIn).toBe(true);
  });

  it('can set reducer LOGOUT_SUCCESS', () => {
    const result = reducer({ }, { type: 'LOGOUT_SUCCESS' });
    expect(result.successful).toBe(true);
    expect(result.requesting).toBe(false);
    expect(result.loggedIn).toBe(false);
  });

  it('can set reducer TOKEN_VALIDATION_REQUESTING', () => {
    const result = reducer({ }, { type: 'TOKEN_VALIDATION_REQUESTING' });
    expect(result.loggedIn).toBe(false);
    expect(result.requesting).toBe(true);
    expect(result.loggedIn).toBe(false);
  });

  it('can handle the default case', () => {
    const result = reducer({ }, { type: 'BANANA 🍌' });
    expect(result.loggedIn).toBe(false);
    expect(result.requesting).toBe(false);
    expect(result.loggedIn).toBe(false);
  });
});
