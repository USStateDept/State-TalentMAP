import * as actions from './showSearchBar';

describe('showSearchBar actions', () => {
  it('can call the toggleSearchBar function', () => {
    expect(actions.toggleSearchBar()).toBeDefined();
  });
});
