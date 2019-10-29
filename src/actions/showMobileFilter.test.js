import { setupAsyncMocks } from '../testUtilities/testUtilities';
import * as actions from './showMobileFilter';

const { mockStore } = setupAsyncMocks();

describe('showMobileFilter actions', () => {
  it('can call the toggleMobileFilter function with show = true', () => {
    const store = mockStore({ shouldShowMobileFilter: false });
    store.dispatch(actions.toggleMobileFilter(true));
  });

  it('can call the toggleMobileFilter function with show = false', () => {
    const store = mockStore({ shouldShowMobileFilter: false });
    store.dispatch(actions.toggleMobileFilter(false));
  });
});
