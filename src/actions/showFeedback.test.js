import { setupAsyncMocks } from '../testUtilities/testUtilities';
import * as actions from './showFeedback';

const { mockStore } = setupAsyncMocks();

describe('showFeedback actions', () => {
  it('can call the toggleFeedback function', () => {
    const store = mockStore({ shouldShowFeedback: false });
    store.dispatch(actions.toggleFeedback(true));
  });
});
