import { setupAsyncMocks } from '../testUtilities/testUtilities';
import * as actions from './clientView';
import { clientObject } from '../__mocks__/client';

const { mockStore, mockAdapter } = setupAsyncMocks();

describe('async actions', () => {
  beforeEach(() => {
    mockAdapter.onGet('/fsbid/client/1/').reply(200,
      clientObject,
    );
    mockAdapter.onGet('/fsbid/client/2/').reply(404,
      null,
    );
  });

  it('can get client', (done) => {
    const store = mockStore({});

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.setClient(1));
        done();
      }, 0);
    };
    f();
  });

  it('can get client - handle error', (done) => {
    const store = mockStore({});

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.setClient(2));
        done();
      }, 0);
    };
    f();
  });

  it('does not throw errors when unsetting client', (done) => {
    const store = mockStore({});

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.unsetClient());
        done();
      }, 0);
    };
    f();
  });
});
