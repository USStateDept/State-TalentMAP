import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as actions from './post';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  beforeEach(() => {
    const mockAdapter = new MockAdapter(axios);

    const post = {
      id: 100,
      tour_of_duty: '1Y2RR',
      code: 'AF1000000',
      description: 'HERAT, AFGHANISTAN',
      cost_of_living_adjustment: 0,
      differential_rate: 35,
      danger_pay: 35,
      rest_relaxation_point: 'London',
      has_consumable_allowance: true,
      has_service_needs_differential: true,
      languages: [{ id: 1, language: 'French (FR)', written_proficiency: '2', spoken_proficiency: '2', representation: 'French (FR) 2/2' }],
    };

    mockAdapter.onGet('http://localhost:8000/api/v1/orgpost/100').reply(200,
      post,
    );
  });

  it('can fetch a position', (done) => {
    const store = mockStore({ post: [] });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.postFetchData('http://localhost:8000/api/v1/orgpost/100'));
        store.dispatch(actions.postIsLoading());
        done();
      }, 0);
    };
    f();
  });
});
