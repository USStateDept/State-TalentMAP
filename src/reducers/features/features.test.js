import reducer, { ENABLED_FEATURES } from './features';

describe('reducers', () => {
  it('always returns enabled features array', () => {
    expect(reducer()).toEqual(ENABLED_FEATURES);
  });
});
