import { setupAsyncMocks } from '../testUtilities/testUtilities';
import * as actions from './homePagePositions';
import resultsObject from '../__mocks__/resultsObject';

const { mockStore, mockAdapter } = setupAsyncMocks();

describe('async actions', () => {
  beforeEach(() => {
    mockAdapter.onGet('http://localhost:8000/api/v1/position/?ordering=create_date&limit=6').reply(200,
      resultsObject,
    );

    mockAdapter.onGet('http://localhost:8000/api/v1/position/highlighted/?limit=3').reply(200,
      resultsObject,
    );
  });

  it('can fetch a position', (done) => {
    const store = mockStore({ results: [] });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.homePagePositionsFetchData());
        store.dispatch(actions.homePagePositionsIsLoading());
        done();
      }, 0);
    };
    f();
  });
});
