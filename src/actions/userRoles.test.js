import { expectMockWasCalled, setupAsyncMocks, spyMockAdapter } from '../testUtilities/testUtilities';
import * as actions from './userRoles';

const { mockStore } = setupAsyncMocks();

describe('async actions', () => {
  let mock;
  let spy;

  it('fetches getTableStats', (done) => {
    const store = mockStore({});

    ({ mock, spy } = spyMockAdapter({
      url: 'permission/group/?name__in=superuser%2Cglossary_editors%2Chelppage_editor', response: [200, {}],
    })); mock();

    store.dispatch(actions.getTableStats());

    expectMockWasCalled({ spy, cb: done });
  });

  it('handles errors when fetching getTableStats', (done) => {
    const store = mockStore({});

    ({ mock, spy } = spyMockAdapter({
      url: 'permission/group/?name__in=superuser%2Cglossary_editors%2Chelppage_editor', response: [404, null],
    })); mock();

    store.dispatch(actions.getTableStats());

    expectMockWasCalled({ spy, cb: done });
  });

  it('fetches modifyPermission - PUT', (done) => {
    const store = mockStore({});

    ({ mock, spy } = spyMockAdapter({
      url: 'permission/group/2/user/1/', response: [200, {}], type: 'onPut',
    })); mock();

    store.dispatch(actions.modifyPermission(true, 1, 2));

    expectMockWasCalled({ spy, cb: done });
  });

  it('handles errors when fetching modifyPermission - PUT', (done) => {
    const store = mockStore({});

    ({ mock, spy } = spyMockAdapter({
      url: 'permission/group/2/user/1/', response: [404, null], type: 'onPut',
    })); mock();

    store.dispatch(actions.modifyPermission(true, 1, 2));

    expectMockWasCalled({ spy, cb: done });
  });

  it('fetches getUsers', (done) => {
    const store = mockStore({});

    ({ mock, spy } = spyMockAdapter({
      url: 'permission/user/all/?limit=100&page=1', response: [200, {}],
    })); mock();

    store.dispatch(actions.getUsers());

    expectMockWasCalled({ spy, cb: done });
  });

  it('handles errors when fetching getUsers', (done) => {
    const store = mockStore({});

    ({ mock, spy } = spyMockAdapter({
      url: 'permission/user/all/?limit=100&page=1', response: [404, null],
    })); mock();

    store.dispatch(actions.getUsers());

    expectMockWasCalled({ spy, cb: done });
  });
});
