import reducer, { initialState } from './highlightPosition';
import {
  HIGHLIGHT_POSITION_HAS_ERRORED,
  HIGHLIGHT_POSITION_IS_LOADING,
} from '../../actions/highlightPosition';

describe('reducers', () => {
  it('can set error state', () => {
    const action = { type: HIGHLIGHT_POSITION_HAS_ERRORED, error: true };
    const state = reducer(initialState, action);
    const expected = {
      success: false,
      error: true,
      loading: false,
    };

    expect(state).toEqual(expected);
  });

  it('can set success state', () => {
    const action = { type: HIGHLIGHT_POSITION_HAS_ERRORED, error: false };
    const state = reducer(initialState, action);
    const expected = {
      success: true,
      error: false,
      loading: false,
    };

    expect(state).toEqual(expected);
  });

  it('can set error state', () => {
    const action = { type: HIGHLIGHT_POSITION_HAS_ERRORED, error: true };
    const state = reducer(initialState, action);
    const expected = {
      success: false,
      error: true,
      loading: false,
    };

    expect(state).toEqual(expected);
  });

  it('can set loading state', () => {
    const action = { type: HIGHLIGHT_POSITION_IS_LOADING, loading: true };
    const state = reducer(initialState, action);
    const expected = {
      success: false,
      error: false,
      loading: true,
    };

    expect(state).toEqual(expected);
  });
});
