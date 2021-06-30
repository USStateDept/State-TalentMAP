import { fetchBidCycles } from './bidCycles';
import mock from '../__mocks__/bidCycles';
import { setupAsyncMocks } from '../testUtilities/testUtilities';

const { mockStore, mockAdapter } = setupAsyncMocks();

describe('bidCycles async actions', () => {
  it('fetches bidcycles and bidhandshakecycles', (done) => {
    const store = mockStore({ profile: {} });

    mockAdapter.onGet('/bidhandshakecycle/').reply(200,
      { results: [] },
    );

    mockAdapter.onPost('/fsbid/reference/cycles/').reply(200,
      mock,
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(fetchBidCycles(false, () => {}));
        done();
      }, 0);
    };
    f();
  });
});
