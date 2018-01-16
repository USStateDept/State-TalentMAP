import { setupAsyncMocks } from '../testUtilities/testUtilities';
import * as actions from './showGlossary';

const { mockStore } = setupAsyncMocks();

describe('showGlossary actions', () => {
  it('can call the toggleGlossary function', () => {
    const store = mockStore({ shouldShowGlossary: false });
    store.dispatch(actions.toggleGlossary(true));
  });
});
