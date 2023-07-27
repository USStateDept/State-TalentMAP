import { expectMockWasCalled, setupAsyncMocks, spyMockAdapter } from '../testUtilities/testUtilities';
import * as actions from './assignment';
import assignmentObject from '../__mocks__/assignmentObject';

const { mockStore } = setupAsyncMocks();

describe('async actions', () => {
  let [mock, spy, store] = Array(3);

  beforeEach(() => {
    store = mockStore({ assignment: [] });

    ({ mock, spy } = spyMockAdapter({
      url: '/fsbid/assignment_history/', response: [200, [assignmentObject]],
    })); mock();
  });

  it('can fetch assignments', (done) => {
    store.dispatch(actions.assignmentFetchData());
    store.dispatch(actions.assignmentIsLoading());
    expectMockWasCalled({ spy, cb: done });
  });

  it('can fetch assignments with an id passed in', (done) => {
    ({ mock, spy } = spyMockAdapter({
      url: '/fsbid/assignment_history/12345/', response: [200, [assignmentObject]],
    })); mock();

    store.dispatch(actions.assignmentFetchData('12345'));
    store.dispatch(actions.assignmentIsLoading());
    expectMockWasCalled({ spy, cb: done });
  });

  it('can handle errors when fetching assignments', (done) => {
    ({ mock, spy } = spyMockAdapter({
      url: '/fsbid/assignment_history/', response: [404],
    })); mock();

    store.dispatch(actions.assignmentFetchData());
    store.dispatch(actions.assignmentIsLoading());
    expectMockWasCalled({ spy, cb: done });
  });
});
