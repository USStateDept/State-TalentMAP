import { setupAsyncMocks } from '../testUtilities/testUtilities';
import * as actions from './favoritePositions';
import resultsObject from '../__mocks__/resultsObject';

const { mockStore, mockAdapter } = setupAsyncMocks();

describe('async actions', () => {
  beforeEach(() => {
    mockAdapter.onGet('http://localhost:8000/api/v1/cycleposition/favorites/').reply(200,
      resultsObject,
    );

    mockAdapter.onGet('http://localhost:8000/api/v1/cycleposition/favorites/').reply(200,
      resultsObject,
    );
  });

  it('can fetch favorite positions', (done) => {
    const store = mockStore({ results: [] });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.favoritePositionsFetchData());
        store.dispatch(actions.favoritePositionsIsLoading());
        done();
      }, 0);
    };
    f();
  });

  it('can fetch favorite positions with a sort parameter', (done) => {
    const store = mockStore({ results: [] });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.favoritePositionsFetchData('asc'));
        store.dispatch(actions.favoritePositionsIsLoading());
        done();
      }, 0);
    };
    f();
  });
});
