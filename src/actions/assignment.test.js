import { expectMockWasCalled, setupAsyncMocks, spyMockAdapter } from '../testUtilities/testUtilities';
import * as actions from './assignment';
import assignmentObject from '../__mocks__/assignmentObject';

const { mockStore } = setupAsyncMocks();

describe('async actions', () => {
  let [mock, spy, store] = Array(3);

  beforeEach(() => {
    store = mockStore({ assignment: {} });

    ({ mock, spy } = spyMockAdapter({
      url: '/profile/assignments/?status=active', response: [200, { results: [assignmentObject] }],
    })); mock();
  });

  it('can fetch assignments', (done) => {
    store.dispatch(actions.assignmentFetchData());
    store.dispatch(actions.assignmentIsLoading());
    expectMockWasCalled({ spy, cb: done });
  });

  it('can fetch assignments where status = closed', (done) => {
    ({ mock, spy } = spyMockAdapter({
      url: '/profile/assignments/?status=closed', response: [200, { results: [assignmentObject] }],
    })); mock();

    store.dispatch(actions.assignmentFetchData('closed'));
    store.dispatch(actions.assignmentIsLoading());
    expectMockWasCalled({ spy, cb: done });
  });

  it('can handle errors when fetching assignments', (done) => {
    ({ mock, spy } = spyMockAdapter({
      url: '/profile/assignments/?status=active', response: [404],
    })); mock();

    store.dispatch(actions.assignmentFetchData());
    store.dispatch(actions.assignmentIsLoading());
    expectMockWasCalled({ spy, cb: done });
  });
});
