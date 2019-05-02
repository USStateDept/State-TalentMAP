import { setupAsyncMocks } from '../testUtilities/testUtilities';
import * as actions from './sortPreferences';

const { mockStore } = setupAsyncMocks();

describe('toast actions', () => {
  it('can call the setSortPreference function', () => {
    const store = mockStore({});
    store.dispatch(actions.setSortPreference('someKey', 'aValue'));
  });
});
