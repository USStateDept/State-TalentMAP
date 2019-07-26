import { setupAsyncMocks } from '../testUtilities/testUtilities';
import * as actions from './homeBannerContent';

const { mockStore, mockAdapter } = setupAsyncMocks();

describe('async actions', () => {
  beforeEach(() => {
    mockAdapter.onGet('http://localhost:8000/api/v1/homepage/banner/').reply(200,
      { text: 'text', is_visible: true },
    );
    mockAdapter.onPatch('http://localhost:8000/api/v1/homepage/banner/').reply(200,
      null,
    );
  });

  it('fetches the home banner content', (done) => {
    const store = mockStore({ notifications: {} });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.homeBannerContentFetchData());
        done();
      }, 0);
    };
    f();
  });

  it('handles errors when fetching the home banner content', (done) => {
    const store = mockStore({});

    mockAdapter.onGet('http://localhost:8000/api/v1/homepage/banner/').reply(404,
      null,
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.homeBannerContentFetchData());
        done();
      }, 0);
    };
    f();
  });

  it('patches the home banner content', (done) => {
    const store = mockStore({ notifications: {} });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.homeBannerContentPatchData({ text: 'text' }));
        done();
      }, 0);
    };
    f();
  });

  it('handles errors when patching the home banner content', (done) => {
    const store = mockStore({});

    mockAdapter.onPatch('http://localhost:8000/api/v1/homepage/banner/').reply(404,
      null,
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.homeBannerContentPatchData({ text: 'text' }));
        done();
      }, 0);
    };
    f();
  });
});
