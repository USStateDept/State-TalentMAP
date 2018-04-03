import { fetchBidCycles, RECEIVE_BID_CYCLES } from './bidCycles';
import mock from '../__mocks__/bidCycles';
import { setupAsyncMocks } from '../testUtilities/testUtilities';

const { mockStore, mockAdapter } = setupAsyncMocks();

describe('bidCycles async actions', () => {
  beforeEach(() => {
    mockAdapter.onAny().reply((config) => {
      switch (config.method) {
        case 'get':
          return [200, { results: mock }];

        default:
          break;
      }

      return [500, null];
    });
  });

  it('creates RECEIVE_BID_CYCLES after fetchBidCycles() finishes', () => {
    const store = mockStore({ bidCycles: [] });
    const actions = [
      { type: RECEIVE_BID_CYCLES, data: mock },
    ];

    return store.dispatch(fetchBidCycles())
      .then(() => {
        expect(store.getActions()).toEqual(actions);
      });
  });
});
