import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as actions from './savedSearch';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('saved search async actions', () => {
  it('can submit request to save a search', (done) => {
    const store = mockStore({ share: false });

    const mockAdapter = new MockAdapter(axios);

    mockAdapter.onPost('http://localhost:8000/api/v1/searches/').reply(200,
      {},
    );

    const message = {};

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.saveSearch(message));
        store.dispatch(actions.newSavedSearchIsSaving(true));
        done();
      }, 0);
    };
    f();
  });

  it('can handle a failed submission', (done) => {
    const store = mockStore({ share: false });

    const mockAdapter = new MockAdapter(axios);

    mockAdapter.onPost('http://localhost:8000/api/v1/searches/').reply(404,
      'error',
    );

    const message = {};

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.saveSearch(message));
        store.dispatch(actions.newSavedSearchIsSaving(true));
        done();
      }, 0);
    };
    f();
  });
});
