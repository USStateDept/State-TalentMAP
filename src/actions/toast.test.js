import { setupAsyncMocks } from '../testUtilities/testUtilities';
import * as actions from './toast';

const { mockStore } = setupAsyncMocks();

describe('toast actions', () => {
  it('can call the toastSuccess function', () => {
    const store = mockStore({ toast: {} });
    store.dispatch(actions.toastSuccess('message'));
  });

  it('can call the toastError function', () => {
    const store = mockStore({ toast: {} });
    store.dispatch(actions.toastError('message'));
  });
});
