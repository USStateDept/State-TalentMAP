import { setupAsyncMocks } from '../testUtilities/testUtilities';
import * as actions from './favoritePositions';
import resultsObject from '../__mocks__/resultsObject';

const { mockStore, mockAdapter } = setupAsyncMocks();

describe('async actions', () => {
  beforeEach(() => {
    mockAdapter.onGet('/available_position/favorites/').reply(200,
      resultsObject,
    );

    mockAdapter.onGet('/projected_vacancy/favorites/').reply(200,
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

  it('can handle errors when fetching', (done) => {
    const store = mockStore({ results: [] });

    mockAdapter.reset();

    mockAdapter.onGet('/cycleposition/favorites/').reply(404,
      null,
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.favoritePositionsFetchData());
        store.dispatch(actions.favoritePositionsIsLoading());
        done();
      }, 0);
    };
    f();
  });
});
