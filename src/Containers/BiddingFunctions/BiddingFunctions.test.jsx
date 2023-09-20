import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import BiddingFunctions from './BiddingFunctions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('BiddingFunctions', () => {
  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <BiddingFunctions />
    </MemoryRouter></Provider>);
    expect(wrapper).toBeDefined();
  });
});

