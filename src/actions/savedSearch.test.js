import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as actions from './savedSearch';
import searchObjectParent from '../__mocks__/searchObjectParent';

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

  it('can submit request to patch an existing saved search', (done) => {
    const store = mockStore({ share: false });

    const mockAdapter = new MockAdapter(axios);

    mockAdapter.onPatch('http://localhost:8000/api/v1/searches/1/').reply(200,
      {},
    );

    const message = {};

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.saveSearch(message, 1));
        store.dispatch(actions.newSavedSearchIsSaving(true));
        done();
      }, 0);
    };
    f();
  });

  it('can fetch saved searches', (done) => {
    const store = mockStore({ share: false });

    const mockAdapter = new MockAdapter(axios);

    mockAdapter.onGet('http://localhost:8000/api/v1/searches/').reply(200,
      searchObjectParent,
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.savedSearchesFetchData());
        done();
      }, 0);
    };
    f();
  });

  it('can handle errors when fetching saved searches', (done) => {
    const store = mockStore({ share: false });

    const mockAdapter = new MockAdapter(axios);

    mockAdapter.onGet('http://localhost:8000/api/v1/searches/').reply(404,
      'error',
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.savedSearchesFetchData());
        done();
      }, 0);
    };
    f();
  });

  it('can handle deleting a saved search', (done) => {
    const store = mockStore({ share: false });

    const mockAdapter = new MockAdapter(axios);

    mockAdapter.onDelete('http://localhost:8000/api/v1/searches/1/').reply(204,
      {},
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.deleteSavedSearch(1));
        done();
      }, 0);
    };
    f();
  });

  it('can handle cloning a saved search', (done) => {
    const store = mockStore({ share: false });

    const mockAdapter = new MockAdapter(axios);

    mockAdapter.onGet('http://localhost:8000/api/v1/searches/1/').reply(200,
      { name: 'test', filters: {}, endpoint: '/api/v1/position' },
    );

    mockAdapter.onPost('http://localhost:8000/api/v1/searches/').reply(204,
      { name: 'test 2' },
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.cloneSavedSearch(1));
        done();
      }, 0);
    };
    f();
  });

  it('can handle errors at the first step when cloning a saved search', (done) => {
    const store = mockStore({ share: false });

    const mockAdapter = new MockAdapter(axios);

    mockAdapter.onGet('http://localhost:8000/api/v1/searches/1/').reply(404,
      'error',
    );

    mockAdapter.onPost('http://localhost:8000/api/v1/searches/').reply(204,
      { name: 'test 2' },
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.cloneSavedSearch(1));
        done();
      }, 0);
    };
    f();
  });

  it('can handle errors at the second step when cloning a saved search', (done) => {
    const store = mockStore({ share: false });

    const mockAdapter = new MockAdapter(axios);

    mockAdapter.onGet('http://localhost:8000/api/v1/searches/1/').reply(200,
      { name: 'test', filters: {}, endpoint: '/api/v1/position' },
    );

    mockAdapter.onPost('http://localhost:8000/api/v1/searches/').reply(404,
      'error',
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.cloneSavedSearch(1));
        done();
      }, 0);
    };
    f();
  });

  it('can handle errors when deleting a saved search', (done) => {
    const store = mockStore({ share: false });

    const mockAdapter = new MockAdapter(axios);

    mockAdapter.onDelete('http://localhost:8000/api/v1/searches/1/').reply(404,
      'error',
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.deleteSavedSearch(1));
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
