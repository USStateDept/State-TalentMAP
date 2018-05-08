import { setupAsyncMocks } from '../testUtilities/testUtilities';
import * as actions from './assignment';
import assignmentObject from '../__mocks__/assignmentObject';

const { mockStore, mockAdapter } = setupAsyncMocks();

describe('async actions', () => {
  beforeEach(() => {
    mockAdapter.onGet('http://localhost:8000/api/v1/profile/assignments/?status=active').reply(200,
      { results: [assignmentObject] },
    );

    mockAdapter.onGet('http://localhost:8000/api/v1/profile/assignments/?status=closed').reply(200,
      { results: [assignmentObject] },
    );
  });

  it('can fetch assignments', (done) => {
    const store = mockStore({ assignment: {} });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.assignmentFetchData());
        store.dispatch(actions.assignmentIsLoading());
        done();
      }, 0);
    };
    f();
  });

  it('can fetch assignments where status = closed', (done) => {
    const store = mockStore({ assignment: {} });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.assignmentFetchData('closed'));
        store.dispatch(actions.assignmentIsLoading());
        done();
      }, 0);
    };
    f();
  });

  it('can handle errors when fetching assignments', (done) => {
    const store = mockStore({ assignment: {} });

    mockAdapter.reset();

    mockAdapter.onGet('http://localhost:8000/api/v1/profile/assignments/?status=active').reply(404,
      null,
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.assignmentFetchData());
        store.dispatch(actions.assignmentIsLoading());
        done();
      }, 0);
    };
    f();
  });
});
