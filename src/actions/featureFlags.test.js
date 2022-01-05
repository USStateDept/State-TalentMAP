import { expectMockWasCalled, setupAsyncMocks, spyMockAdapter } from '../testUtilities/testUtilities';
import * as actions from './featureFlags';

const { mockStore } = setupAsyncMocks();

describe('async actions', () => {
  let mock;
  let spy;

  it('fetches fetchFeatureFlagsData', (done) => {
    const store = mockStore({});

    ({ mock, spy } = spyMockAdapter({
      url: '/featureflags/', response: [200, {}],
    })); mock();

    store.dispatch(actions.fetchFeatureFlagsData());

    expectMockWasCalled({ spy, cb: done });
  });

  it('handles errors when fetching fetchFeatureFlagsData', (done) => {
    const store = mockStore({});

    ({ mock, spy } = spyMockAdapter({
      url: '/featureflags/', response: [404, null],
    })); mock();

    store.dispatch(actions.fetchFeatureFlagsData());

    expectMockWasCalled({ spy, cb: done });
  });

  it('posts postFeatureFlagsData', (done) => {
    const store = mockStore({});

    ({ mock, spy } = spyMockAdapter({
      url: '/featureflags/', response: [200, {}], type: 'onPost',
    })); mock();

    store.dispatch(actions.postFeatureFlagsData({}));

    expectMockWasCalled({ spy, cb: done });
  });

  it('handles errors when posting postFeatureFlagsData', (done) => {
    const store = mockStore({});

    ({ mock, spy } = spyMockAdapter({
      url: '/featureflags/', response: [404, null], type: 'onPost',
    })); mock();

    store.dispatch(actions.postFeatureFlagsData({}));

    expectMockWasCalled({ spy, cb: done });
  });
});
