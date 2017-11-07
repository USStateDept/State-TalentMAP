import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as actions from './assignment';
import assignmentObject from '../__mocks__/assignmentObject';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  beforeEach(() => {
    const mockAdapter = new MockAdapter(axios);

    mockAdapter.onGet('http://localhost:8000/api/v1/profile/assignments/').reply(200,
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
