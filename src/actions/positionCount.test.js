import { setupAsyncMocks } from '../testUtilities/testUtilities';
import * as actions from './positionCount';

const { mockStore, mockAdapter } = setupAsyncMocks();

describe('async actions', () => {
  beforeEach(() => {
    const details = { count: 1867 };

    mockAdapter.onGet('/fsbid/available_positions/?limit=1').reply(200,
      details,
    );
  });

  it('can fetch position count', (done) => {
    const store = mockStore({});

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.positionCountFetchData());
        done();
      }, 0);
    };
    f();
  });

  it('can handle errors when fetching a position', (done) => {
    const store = mockStore({});

    mockAdapter.onGet('/fsbid/available_positions/?limit=1').reply(404,
      null,
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.positionCountFetchData());
        done();
      }, 0);
    };
    f();
  });
});
