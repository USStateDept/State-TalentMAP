import { setupAsyncMocks } from '../testUtilities/testUtilities';
import * as actions from './glossary';
import glossaryItems from '../__mocks__/glossaryItems';

const { mockStore, mockAdapter } = setupAsyncMocks();

describe('async actions', () => {
  beforeEach(() => {
    mockAdapter.onGet('http://localhost:8000/api/v1/glossary/').reply(200,
      { results: glossaryItems },
    );

    mockAdapter.onGet('http://localhost:8000/api/v1/glossary/?is_archived=false').reply(200,
      { results: glossaryItems },
    );

    mockAdapter.onPost('http://localhost:8000/api/v1/glossary/').reply(200,
      glossaryItems[0],
    );

    mockAdapter.onPatch('http://localhost:8000/api/v1/glossary/3/').reply(200,
      glossaryItems[0],
    );
  });

  it('can fetch the glossary', (done) => {
    const store = mockStore({ glossary: {} });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.glossaryFetchData());
        store.dispatch(actions.glossaryIsLoading());
        done();
      }, 0);
    };
    f();
  });

  it('can handle errors when fetching the glossary', (done) => {
    const store = mockStore({ glossary: {} });

    mockAdapter.reset();

    mockAdapter.onGet('http://localhost:8000/api/v1/glossary/?is_archived=false').reply(404,
      null,
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.glossaryFetchData());
        store.dispatch(actions.glossaryIsLoading());
        done();
      }, 0);
    };
    f();
  });

  it('can fetch the editor glossary', (done) => {
    const store = mockStore({ glossary: {} });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.glossaryEditorFetchData());
        store.dispatch(actions.glossaryEditorIsLoading());
        done();
      }, 0);
    };
    f();
  });

  it('can handle errors when fetching the editor glossary', (done) => {
    const store = mockStore({ glossary: {} });

    mockAdapter.reset();

    mockAdapter.onGet('http://localhost:8000/api/v1/glossary/').reply(404,
      null,
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.glossaryEditorFetchData());
        store.dispatch(actions.glossaryEditorIsLoading());
        done();
      }, 0);
    };
    f();
  });

  it('can post a new term to the glossary', (done) => {
    const store = mockStore({ glossary: {} });

    const f = () => {
      setTimeout(() => {
        const term = { title: 'title', definition: 'definition' };
        store.dispatch(actions.glossaryPost(term));
        store.dispatch(actions.glossaryPostIsLoading());
        done();
      }, 0);
    };
    f();
  });

  it('can handle errors when posting', (done) => {
    const store = mockStore({ glossary: {} });

    mockAdapter.reset();

    mockAdapter.onPost('http://localhost:8000/api/v1/glossary/').reply(404,
      null,
    );

    const f = () => {
      setTimeout(() => {
        const term = { title: 'title', definition: 'definition' };
        store.dispatch(actions.glossaryPost(term));
        store.dispatch(actions.glossaryPostIsLoading());
        done();
      }, 0);
    };
    f();
  });

  it('can patch an existing item in the glossary', (done) => {
    const store = mockStore({ glossary: {} });

    const f = () => {
      setTimeout(() => {
        const term = { id: 3, title: 'title', definition: 'definition' };
        store.dispatch(actions.glossaryPatch(term));
        store.dispatch(actions.glossaryPatchIsLoading());
        done();
      }, 0);
    };
    f();
  });

  it('can handle errors when patching', (done) => {
    const store = mockStore({ glossary: {} });

    mockAdapter.reset();

    mockAdapter.onPatch('http://localhost:8000/api/v1/glossary/3/').reply(404,
      null,
    );

    const f = () => {
      setTimeout(() => {
        const term = { id: 3, title: 'title', definition: 'definition' };
        store.dispatch(actions.glossaryPatch(term));
        store.dispatch(actions.glossaryPatchIsLoading());
        done();
      }, 0);
    };
    f();
  });

  it('can call glossaryEditorCancel', () => {
    const store = mockStore({ glossary: {} });
    store.dispatch(actions.glossaryEditorCancel(1));
  });
});
