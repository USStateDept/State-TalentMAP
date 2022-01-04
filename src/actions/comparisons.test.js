import { expectMockWasCalled, setupAsyncMocks, spyMockAdapter } from '../testUtilities/testUtilities';
import * as actions from './comparisons';

const { mockStore } = setupAsyncMocks();

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
  ],
};

describe('async actions', () => {
  let [mock, spy, store] = Array(3);

  beforeEach(() => {
    store = mockStore({ comparisons: [] });

    ({ mock, spy } = spyMockAdapter({
      url: '/fsbid/available_positions/?id=6,60', response: [200, comparisons],
    })); mock();
  });

  it('can fetch positions', (done) => {
    store.dispatch(actions.comparisonsFetchData('6,60'));
    store.dispatch(actions.comparisonsIsLoading());
    expectMockWasCalled({ spy, cb: done });
  });

  it('can handle errors when fetching positions', (done) => {
    ({ mock, spy } = spyMockAdapter({
      url: '/fsbid/available_positions/?id=5,20', response: [404],
    })); mock();
    store.dispatch(actions.comparisonsFetchData('5,20'));
    store.dispatch(actions.comparisonsIsLoading());
    expectMockWasCalled({ spy, cb: done });
  });
});
