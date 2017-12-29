import { setupAsyncMocks } from '../testUtilities/testUtilities';
import * as actions from './descriptionEdit';

const { mockStore, mockAdapter } = setupAsyncMocks();

describe('async actions', () => {
  // reset the mockAdapter since we repeat specific requests
  beforeEach(() => {
    mockAdapter.reset();
  });

  it('can call the editDescriptionContent function', (done) => {
    const store = mockStore({});

    mockAdapter.onPatch('http://localhost:8000/api/v1/capsule_description/1/').reply(200,
      'success',
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.editDescriptionContent(1, {}));
        done();
      }, 0);
    };
    f();
  });

  it('can call the editPocContent function', (done) => {
    const store = mockStore({});

    mockAdapter.onPatch('http://localhost:8000/api/v1/capsule_description/1/').reply(200,
      'success',
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.editPocContent(1, {}));
        done();
      }, 0);
    };
    f();
  });

  it('can call the editWebsiteContent function', (done) => {
    const store = mockStore({});

    mockAdapter.onPatch('http://localhost:8000/api/v1/capsule_description/1/').reply(200,
      'success',
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.editWebsiteContent(1, {}));
        done();
      }, 0);
    };
    f();
  });

  it('can call the resetMessages function', (done) => {
    const store = mockStore({});

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.resetMessages());
        done();
      }, 0);
    };
    f();
  });

  it('can handle a failed edit', (done) => {
    const store = mockStore({});

    mockAdapter.onPatch('http://localhost:8000/api/v1/capsule_description/1/').reply(404,
      { message: 'unauthorized' },
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.editWebsiteContent(1, {}));
        done();
      }, 0);
    };
    f();
  });
});
