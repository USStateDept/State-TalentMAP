import { setupAsyncMocks } from '../testUtilities/testUtilities';
import * as actions from './profileMenu';

const { mockStore } = setupAsyncMocks();

describe('profileMenu', () => {
  it('can call setProfileMenuExpanded', () => {
    const store = mockStore({ expanded: true });
    store.dispatch(actions.setProfileMenuExpanded(false));
  });

  it('can call setProfileMenuSectionExpanded', () => {
    const store = mockStore({ expanded: {} });
    store.dispatch(actions.setProfileMenuSectionExpanded({ title: 'test', display: false }));
  });
});
