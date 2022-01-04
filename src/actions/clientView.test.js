import { expectMockWasCalled, setupAsyncMocks, spyMockAdapter } from '../testUtilities/testUtilities';
import * as actions from './clientView';
import { clientObject } from '../__mocks__/client';

const { mockStore } = setupAsyncMocks();

describe('async actions', () => {
  let [mock, spy, store] = Array(3);

  beforeEach(() => {
    store = mockStore({});

    ({ mock, spy } = spyMockAdapter({
      url: '/fsbid/client/1/', response: [200, clientObject],
    })); mock();
  });

  it('can get client', (done) => {
    store.dispatch(actions.setClient(1));
    expectMockWasCalled({ spy, cb: done });
  });

  it('can get client - handle error', (done) => {
    ({ mock, spy } = spyMockAdapter({
      url: '/fsbid/client/2/', response: [404],
    })); mock();

    store.dispatch(actions.setClient(2));
    expectMockWasCalled({ spy, cb: done });
  });

  it('does not throw errors when unsetting client', () => {
    store.dispatch(actions.unsetClient());
  });
});
