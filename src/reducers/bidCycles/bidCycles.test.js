import reducer, { initialState } from './bidCycles';
import mock from '../../__mocks__/bidCycles';
import { RECEIVE_BID_CYCLES } from '../../actions/bidCycles';

describe('bidCycles reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle RECEIVE_BID_CYCLES', () => {
    const action = {
      type: RECEIVE_BID_CYCLES,
      data: mock,
    };

    expect(reducer(false, action)).toBe(mock);
  });
});
