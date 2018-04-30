import { setupAsyncMocks } from '../testUtilities/testUtilities';
import * as actions from './highlightPosition';

const { mockStore, mockAdapter } = setupAsyncMocks();

describe('GET all highlighted position actions - /highlighted', () => {
  beforeEach(() => {
    mockAdapter.onGet('http://localhost:8000/api/v1/position/highlighted/').reply(200,
      {},
    );

    mockAdapter.onGet('http://localhost:8000/api/v1/position/highlighted/').reply(200,
      {},
    );
  });

  it('can get highlight positions', (done) => {
    const store = mockStore({ results: [] });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.highlightPositionFetchData());
        store.dispatch(actions.highlightPositionIsLoading());
        done();
      }, 0);
    };
    f();
  });
});

describe('GET single highlighted position actions - /highlighted', () => {
  const positionID = 42;

  beforeEach(() => {
    mockAdapter.onGet(`http://localhost:8000/api/v1/position/${positionID}/highlight/`).reply(200,
        {},
      );

    mockAdapter.onGet(`http://localhost:8000/api/v1/position/${positionID}/highlight/`).reply(200,
        {},
      );
  });

  it('can get highlight positions', (done) => {
    const store = mockStore({ results: [] });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.getHighlightedPosition(positionID));
        store.dispatch(actions.highlightPositionIsLoading());
        done();
      }, 0);
    };
    f();
  });
});

describe('PUT single highlighted position actions - /highlighted', () => {
  const positionID = 42;

  beforeEach(() => {
    mockAdapter.onPut(`http://localhost:8000/api/v1/position/${positionID}/highlight/`).reply(200,
          {},
        );

    mockAdapter.onPut(`http://localhost:8000/api/v1/position/${positionID}/highlight/`).reply(200,
          {},
        );
  });

  it('can get highlight positions', (done) => {
    const store = mockStore({ results: [] });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.putHighlightedPosition(positionID));
        store.dispatch(actions.highlightPositionIsLoading());
        done();
      }, 0);
    };
    f();
  });
});
