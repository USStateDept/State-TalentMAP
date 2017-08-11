import reducer from './reducer';
import { CLIENT_SET, CLIENT_UNSET } from './constants';

describe('reducers', () => {
  it('can set reducer CLIENT_SET', () => {
    expect(reducer(undefined, { type: CLIENT_SET, token: '1234' }).token).toBe('1234');
  });

  it('can set reducer CLIENT_UNSET', () => {
    expect(reducer(undefined, { type: CLIENT_UNSET }).token).toBe(null);
  });
});
