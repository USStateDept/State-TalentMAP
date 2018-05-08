import { setupAsyncMocks } from '../testUtilities/testUtilities';
import * as actions from './results';

const { mockStore, mockAdapter } = setupAsyncMocks();

describe('async actions', () => {
  beforeEach(() => {
    const results = [
      { id: 6,
        grade: '05',
        skill: 'OFFICE MANAGEMENT (9017)',
        bureau: '150000',
        organization: 'YAOUNDE CAMEROON (YAOUNDE)',
        position_number: '00025003',
        is_overseas: true,
        create_date: '2006-09-20',
        update_date: '2017-06-08',
        post: { id: 162, tour_of_duty: '2YRR', code: 'LT6000000', location: 'MASERU, LESOTHO', cost_of_living_adjustment: 0, differential_rate: 15, danger_pay: 0, rest_relaxation_point: 'London', has_consumable_allowance: false, has_service_needs_differential: false },
        languages: [
          { id: 1, language: 'French (FR)', reading_proficiency: '2', spoken_proficiency: '2', representation: 'French (FR) 2/2' },
        ],
      },
      { id: 60,
        grade: '03',
        skill: 'OFFICE MANAGEMENT (9017)',
        bureau: '150000',
        organization: 'YAOUNDE CAMEROON (YAOUNDE)',
        position_number: '00025003',
        is_overseas: true,
        create_date: '2006-09-20',
        update_date: '2017-06-08',
        post: null,
        languages: [],
      },
    ];

    mockAdapter.onGet('http://localhost:8000/api/v1/position/?').reply(200,
      results,
    );

    mockAdapter.onGet('http://localhost:8000/api/v1/position/1/similar/?limit=3').reply(200,
      results,
    );

    // We'll use this mock to provide coverage in /src/api.js
    mockAdapter.onGet('http://localhost:8000/api/v1/position/2/similar/?limit=3').reply(401,
      'Invalid token',
    );
  });

  it('can fetch positions', (done) => {
    const store = mockStore({ results: [] });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.resultsFetchData(''));
        store.dispatch(actions.resultsIsLoading());
        done();
      }, 0);
    };
    f();
  });

  it('can fetch similar positions', (done) => {
    const store = mockStore({ results: [] });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.resultsFetchSimilarPositions(1));
        store.dispatch(actions.resultsSimilarPositionsIsLoading());
        done();
      }, 0);
    };
    f();
  });

  it('can handle errors when fetching similar positions', (done) => {
    const store = mockStore({ results: [] });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.resultsFetchSimilarPositions(2));
        store.dispatch(actions.resultsSimilarPositionsIsLoading());
        done();
      }, 0);
    };
    f();
  });

  it('can handle errors when fetching positions', (done) => {
    const store = mockStore({ results: [] });

    mockAdapter.reset();

    mockAdapter.onGet('http://localhost:8000/api/v1/position/?').reply(404,
      null,
    );

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.resultsFetchData(''));
        store.dispatch(actions.resultsIsLoading());
        done();
      }, 0);
    };
    f();
  });
});
