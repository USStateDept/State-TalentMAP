import { setupAsyncMocks } from '../testUtilities/testUtilities';
import * as actions from './post';

const { mockStore, mockAdapter } = setupAsyncMocks();

describe('async actions', () => {
  beforeEach(() => {
    const post = {
      id: 100,
      tour_of_duty: '1Y2RR',
      code: 'AF1000000',
      location: 'HERAT, AFGHANISTAN',
      cost_of_living_adjustment: 0,
      differential_rate: 35,
      danger_pay: 35,
      rest_relaxation_point: 'London',
      has_consumable_allowance: true,
      has_service_needs_differential: true,
      languages: [{ id: 1, language: 'French (FR)', reading_proficiency: '2', spoken_proficiency: '2', representation: 'French (FR) 2/2' }],
    };

    mockAdapter.onGet('http://localhost:8000/api/v1/orgpost/100/').reply(200,
      post,
    );

    mockAdapter.onGet('http://localhost:8000/api/v1/orgpost/200/').reply(404,
      null,
    );
  });

  it('can fetch a post', (done) => {
    const store = mockStore({ post: [] });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.postFetchData('100'));
        store.dispatch(actions.postIsLoading());
        done();
      }, 0);
    };
    f();
  });

  it('can handle errors when fetching a post', (done) => {
    const store = mockStore({ post: [] });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.postFetchData('200'));
        store.dispatch(actions.postIsLoading());
        done();
      }, 0);
    };
    f();
  });
});
