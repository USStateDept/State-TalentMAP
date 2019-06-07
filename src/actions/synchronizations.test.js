import { setupAsyncMocks } from '../testUtilities/testUtilities';
import * as actions from './synchronizations';

const { mockStore, mockAdapter } = setupAsyncMocks();

describe('async actions', () => {
  beforeEach(() => {
    mockAdapter.onGet('http://localhost:8000/api/v1/data_sync/').reply(200,
      [],
    );

    mockAdapter.onGet('http://localhost:8000/api/v1/data_sync/').reply(404,
      null,
    );
  });

  it('fetches sync jobs', (done) => {
    const store = mockStore({ comparisons: [] });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.syncsFetchData());
        done();
      }, 0);
    };
    f();
  });

  it('handles errors when fetching sync jobs', (done) => {
    const store = mockStore({});

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.syncsFetchData());
        done();
      }, 0);
    };
    f();
  });
});
