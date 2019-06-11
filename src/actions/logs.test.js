import { setupAsyncMocks } from '../testUtilities/testUtilities';
import * as actions from './logs';

const { mockStore, mockAdapter } = setupAsyncMocks();

describe('async actions', () => {
  beforeEach(() => {
    // limit = 3 is the default param in the function
    mockAdapter.onGet('http://localhost:8000/api/v1/logs/').reply(200,
      { data: [
        'permissions.log',
        'test.log',
      ] },
    );
    mockAdapter.onGet('http://localhost:8000/api/v1/logs/permissions/').reply(200,
      { data: 'log text' },
    );
    mockAdapter.onGet('http://localhost:8000/api/v1/logs/test/').reply(200,
      { data: 'more log text' },
    );
  });

  it('can fetch logs', (done) => {
    const store = mockStore({ notifications: {} });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.getLogs());
        done();
      }, 0);
    };
    f();
  });

  it('can handle errors when fetching logs', (done) => {
    mockAdapter.onGet('http://localhost:8000/api/v1/logs/').reply(404,
      null,
    );

    const store = mockStore({});

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.getLogs());
        done();
      }, 0);
    };
    f();
  });
});
