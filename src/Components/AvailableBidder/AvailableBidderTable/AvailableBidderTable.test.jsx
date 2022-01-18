import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import AvailableBidderTable from './AvailableBidderTable';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('AvailableBidderTable', () => {
  const props = {
    bidders: [],
    onSort: () => {},
    onFilter: () => {},
    isCDO: true,
  };

  it('mounts', () => {
    const wrapper = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <AvailableBidderTable {...props} />
    </MemoryRouter></Provider>);
    expect(wrapper).toBeDefined();
  });
});
