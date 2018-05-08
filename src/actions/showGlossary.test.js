import { setupAsyncMocks } from '../testUtilities/testUtilities';
import * as actions from './showGlossary';

const { mockStore } = setupAsyncMocks();

describe('showGlossary actions', () => {
  it('can call the toggleGlossary function with show = true', () => {
    const store = mockStore({ shouldShowGlossary: false });
    store.dispatch(actions.toggleGlossary(true));
  });

  it('can call the toggleGlossary function with show = false', () => {
    const store = mockStore({ shouldShowGlossary: false });
    store.dispatch(actions.toggleGlossary(false));
  });
});
