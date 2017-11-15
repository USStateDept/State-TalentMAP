import setupAsyncMocks from './setupAsyncMocks';
import * as actions from './assignment';
import assignmentObject from '../__mocks__/assignmentObject';

const { mockStore, mockAdapter } = setupAsyncMocks();

describe('async actions', () => {
  beforeEach(() => {
    mockAdapter.onGet('http://localhost:8000/api/v1/profile/assignments/?status=active').reply(200,
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
});
