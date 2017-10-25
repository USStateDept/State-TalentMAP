import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as actions from './postAutocomplete';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  beforeEach(() => {
    const mockAdapter = new MockAdapter(axios);

    const results = [
      {
        id: 1,
        code: 'AE1200000',
        location: 'Dubai, United Arab Emirates',
        tour_of_duty: '3 YRS ( 2 R & R )',
        cost_of_living_adjustment: 25,
        differential_rate: 5,
        danger_pay: 0,
        rest_relaxation_point: 'London',
        has_consumable_allowance: false,
        has_service_needs_differential: false,
      },
    ];

    mockAdapter.onGet('http://localhost:8000/api/v1/orgpost/?location__city__icontains=Dubai&limit=3').reply(200,
      results,
    );

    mockAdapter.onGet('http://localhost:8000/api/v1/orgpost/?location__city__icontains=fake&limit=3').reply(404,
      null,
    );
  });

  it('can fetch post reuslts', (done) => {
    const store = mockStore({ results: [] });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.postSearchFetchData('Dubai'));
        store.dispatch(actions.postSearchIsLoading());
        done();
      }, 0);
    };
    f();
  });

  it('can handle failed requests', (done) => {
    const store = mockStore({ results: [] });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.postSearchFetchData('fake'));
        store.dispatch(actions.postSearchIsLoading());
        done();
      }, 0);
    };
    f();
  });
});
