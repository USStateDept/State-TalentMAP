import { dataReducer } from 'hooks';

describe('dataReducer', () => {
  const state = { a: 1 };
  let action;

  it('returns for get', () => {
    action = { type: 'get' };
    const out = dataReducer(state, action);
    expect(out).toEqual({
      ...state,
      loading: true,
    });
  });

  it('returns for success', () => {
    action = { type: 'success', payload: { data: 1 } };
    const out = dataReducer(state, action);
    expect(out).toEqual({
      ...state,
      data: action.payload.data,
      error: null,
      loading: false,
    });
  });

  it('returns for error', () => {
    action = { type: 'error', payload: { error: 'err' } };
    const out = dataReducer(state, action);
    expect(out).toEqual({
      ...state,
      data: null,
      error: action.payload.error,
      loading: false,
    });
  });

  it('returns for default', () => {
    action = { type: 'fake' };
    const out = dataReducer(state, action);
    expect(out).toEqual(state);
  });
});
