import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as actions from './favoritePositions';
import resultsObject from '../__mocks__/resultsObject';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  beforeEach(() => {
    const mockAdapter = new MockAdapter(axios);

    mockAdapter.onGet('http://localhost:8000/api/v1/position/favorites/').reply(200,
      resultsObject,
    );

    mockAdapter.onGet('http://localhost:8000/api/v1/position/favorites/').reply(200,
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
});
