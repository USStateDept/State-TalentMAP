import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as actions from './comparisons';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  beforeEach(() => {
    const mockAdapter = new MockAdapter(axios);

    const comparisons = {
      count: 2,
      results: [
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
        { id: 1, language: 'French (FR)', written_proficiency: '2', spoken_proficiency: '2', representation: 'French (FR) 2/2' },
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
      ],
    };

    mockAdapter.onGet('http://localhost:8000/api/v1/position/?position_number__in=6,60').reply(200,
      comparisons,
    );
  });

  it('can fetch a position', (done) => {
    const store = mockStore({ comparisons: [] });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.comparisonsFetchData('6,60'));
        store.dispatch(actions.comparisonsIsLoading());
        done();
      }, 0);
    };
    f();
  });
});
