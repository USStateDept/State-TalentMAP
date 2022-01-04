import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import toJSON from 'enzyme-to-json';
import AvailableBidderRow from './AvailableBidderRow';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('AvailableBidderRow', () => {
  const props = {
    bidder: {},
    CDOView: false,
    isLoading: false,
    isCDO: false,
    bureaus: [],
  };

  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <AvailableBidderRow
        {...props}
      />
    </MemoryRouter></Provider>);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <AvailableBidderRow
        {...props}
      />
    </MemoryRouter></Provider>);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
