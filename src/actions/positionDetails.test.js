import { setupAsyncMocks } from '../testUtilities/testUtilities';
import * as actions from './positionDetails';

const { mockStore, mockAdapter } = setupAsyncMocks();

describe('async actions', () => {
  beforeEach(() => {
    const details = { count: 2,
      results: [{
        id: 4,
        grade: '05',
        skill: 'OFFICE MANAGEMENT (9017)',
        bureau: '150000',
        organization: 'FREETOWN SIERRA LEONE (FREETOWN)',
        position_number: '00011111',
        is_overseas: true,
        create_date: '2006-09-20',
        update_date: '2017-06-08',
        languages: [],
      }] };

    mockAdapter.onGet('http://localhost:8000/api/v1/position/?position_number=00011111').reply(200,
      details,
    );
  });

  it('can fetch a position', (done) => {
    const store = mockStore({ position: [] });

    const f = () => {
      setTimeout(() => {
        store.dispatch(actions.positionDetailsFetchData('00011111'));
        store.dispatch(actions.positionDetailsIsLoading());
        done();
      }, 0);
    };
    f();
  });
});
