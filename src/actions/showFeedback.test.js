import { setupAsyncMocks } from '../testUtilities/testUtilities';
import * as actions from './showFeedback';

const { mockStore } = setupAsyncMocks();

describe('showFeedback actions', () => {
  it('can call the toggleFeedback function with show = true', () => {
    const store = mockStore({ shouldShowFeedback: false });
    store.dispatch(actions.toggleFeedback(true));
  });

  it('can call the toggleFeedback function with show = false', () => {
    const store = mockStore({ shouldShowFeedback: false });
    store.dispatch(actions.toggleFeedback(false));
  });
});
