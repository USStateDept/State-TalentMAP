import { expectMockWasCalled, setupAsyncMocks, spyMockAdapter } from '../testUtilities/testUtilities';
import * as actions from './aboutContent';

const { mockStore } = setupAsyncMocks();

describe('async actions', () => {
  let mock;
  let spy;

  it('fetches the about content', (done) => {
    const store = mockStore({});

    ({ mock, spy } = spyMockAdapter({
      url: '/aboutpage/', response: [200, { text: 'text', is_visible: true }],
    })); mock();

    store.dispatch(actions.aboutContentFetchData());

    expectMockWasCalled({ spy, cb: done });
  });

  it('handles errors when fetching the about content', (done) => {
    const store = mockStore({});

    ({ mock, spy } = spyMockAdapter({
      url: '/aboutpage/', response: [404, null],
    })); mock();

    store.dispatch(actions.aboutContentFetchData());

    expectMockWasCalled({ spy, cb: done });
  });

  it('patches the home banner content', (done) => {
    const store = mockStore({});

    ({ mock, spy } = spyMockAdapter({
      url: '/aboutpage/', response: [200, null], type: 'onPatch',
    })); mock();

    store.dispatch(actions.aboutContentPatchData({ content: 'text' }));

    expectMockWasCalled({ spy, cb: done });
  });

  it('handles errors when patching the home banner content', (done) => {
    const store = mockStore({});

    ({ mock, spy } = spyMockAdapter({
      url: '/aboutpage/', response: [404, null], type: 'onPatch',
    })); mock();

    store.dispatch(actions.aboutContentPatchData({ content: 'text' }));

    expectMockWasCalled({ spy, cb: done });
  });
});
