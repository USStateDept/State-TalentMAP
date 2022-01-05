import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import TestUtils from 'react-dom/test-utils';
import toJSON from 'enzyme-to-json';
import BidCycles from './BidCycles';
import mock from '../../__mocks__/bidCycles';
import { setupAsyncMocks } from '../../testUtilities/testUtilities';

const { mockStore, mockAdapter } = setupAsyncMocks();
const wrapper$ = () => (
  <Provider store={mockStore({ bidCycles: [] })}>
    <MemoryRouter>
      <BidCycles />
    </MemoryRouter>
  </Provider>
);

describe('BidCyclesContainer', () => {
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

  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(wrapper$());
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = TestUtils.renderIntoDocument(wrapper$());
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
