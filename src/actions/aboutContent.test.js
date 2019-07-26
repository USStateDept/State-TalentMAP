import { setupAsyncMocks } from '../testUtilities/testUtilities';
import * as actions from './aboutContent';

const { mockStore, mockAdapter } = setupAsyncMocks();

describe('async actions', () => {
  beforeEach(() => {
    mockAdapter.onGet('http://localhost:8000/api/v1/aboutpage/').reply(200,
      { text: 'text', is_visible: true },
    );
    mockAdapter.onPatch('http://localhost:8000/api/v1/aboutpage/').reply(200,
      null,
    );
  });

  it('fetches the about content', (done) => {
    const store = mockStore({});

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.aboutContentFetchData());
        done();
      }, 0);
    };
    f();
  });

  it('handles errors when fetching the about content', (done) => {
    const store = mockStore({});

    mockAdapter.onGet('http://localhost:8000/api/v1/aboutpage/').reply(404,
      null,
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.aboutContentFetchData());
        done();
      }, 0);
    };
    f();
  });

  it('patches the home banner content', (done) => {
    const store = mockStore({});

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.aboutContentPatchData({ content: 'text' }));
        done();
      }, 0);
    };
    f();
  });

  it('handles errors when patching the home banner content', (done) => {
    const store = mockStore({});

    mockAdapter.onPatch('http://localhost:8000/api/v1/aboutpage/').reply(404,
      null,
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.aboutContentPatchData({ content: 'text' }));
        done();
      }, 0);
    };
    f();
  });
});
