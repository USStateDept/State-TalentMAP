import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import api from '../../api';
import * as actions from './postAutocomplete';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockAdapter = new MockAdapter(api);

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

mockAdapter.onGet('/orgpost/?q=Dubai&limit=3').reply(200,
  { results },
);

mockAdapter.onGet('/v1/orgpost/?q=fake&limit=3').reply(404,
  null,
);

describe('async actions', () => {
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

  it('can handle responses with null locations', (done) => {
    const store = mockStore({ posts: [] });

    mockAdapter.onGet('/api/v1/orgpost/?q=Dubai&limit=3').reply(200,
      { results: [
        Object.assign({}, results[0]),
        Object.assign(results[0], { location: null }),
      ],
      },
    );

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
