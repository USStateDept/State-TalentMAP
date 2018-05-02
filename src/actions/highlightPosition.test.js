import { setupAsyncMocks } from '../testUtilities/testUtilities';
import * as actions from './highlightPosition';

const { mockStore, mockAdapter } = setupAsyncMocks();

describe('GET all highlighted position actions - /position/highlighted', () => {
  beforeEach(() => {
    mockAdapter.onGet('/position/highlighted/').reply(200, {});
    mockAdapter.onGet('/position/highlighted/').reply(200, {});
  });

  it('can get highlight positions', (done) => {
    const store = mockStore({ results: [] });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.highlightPositionFetchData());
        store.dispatch(actions.highlightPositionIsLoading(false));
        done();
      }, 0);
    };
    f();
  });
});

describe('GET single highlighted position actions - position/:id/highlight/', () => {
  const positionID = 42;

  beforeEach(() => {
    mockAdapter.onGet(`/position/${positionID}/highlight/`).reply(200, {});
    mockAdapter.onGet(`/position/${positionID}/highlight/`).reply(200, {});
  });

  it('can get highlight positions', (done) => {
    const store = mockStore({ results: [] });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.getHighlightedPosition(positionID));
        store.dispatch(actions.highlightPositionIsLoading(false));
        done();
      }, 0);
    };
    f();
  });
});

describe('PUT single highlighted position actions - /position/:id/highlight/', () => {
  const positionID = 42;

  beforeEach(() => {
    mockAdapter.onPut(`/position/${positionID}/highlight/`).reply(200, {});
    mockAdapter.onPut(`/position/${positionID}/highlight/`).reply(200, {});
  });

  it('can get highlight positions', (done) => {
    const store = mockStore({ results: [] });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.putHighlightedPosition(positionID));
        store.dispatch(actions.highlightPositionIsLoading(false));
        done();
      }, 0);
    };
    f();
  });
});

describe('DELETE single highlighted position actions - /position/:id/highlight/', () => {
  const positionID = 42;

  beforeEach(() => {
    mockAdapter.onDelete(`position/${positionID}/highlight/`).reply(200, {});
    mockAdapter.onDelete(`position/${positionID}/highlight/`).reply(200, {});
  });

  it('can get highlight positions', (done) => {
    const store = mockStore({ results: [] });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.deleteHighlightPosition(positionID));
        store.dispatch(actions.highlightPositionIsLoading(false));
        done();
      }, 0);
    };
    f();
  });
});
