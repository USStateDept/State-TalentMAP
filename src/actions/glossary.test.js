import { setupAsyncMocks } from '../testUtilities/testUtilities';
import * as actions from './glossary';

const { mockStore } = setupAsyncMocks();

describe('async actions', () => {
  it('can fetch the glossary', (done) => {
    const store = mockStore({ glossary: [] });

    store.dispatch(actions.glossaryFetchData());
    store.dispatch(actions.glossaryIsLoading());

    const f = () => {
      setTimeout(() => {
        done();
      }, 600);
    };
    f();
  });
});
