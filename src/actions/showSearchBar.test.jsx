import { setupAsyncMocks } from '../testUtilities/testUtilities';
import * as actions from './showSearchBar';

const { mockStore } = setupAsyncMocks();

describe('showSearchBar actions', () => {
  it('can call the toggleSearchBar function', () => {
    const store = mockStore({ shouldShowSearchBar: false });
    store.dispatch(actions.toggleSearchBar(true));
  });
});
