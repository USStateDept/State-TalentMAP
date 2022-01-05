import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Cdo from './Cdo';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Cdo', () => {
  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <Cdo />
    </MemoryRouter></Provider>);
    expect(wrapper).toBeDefined();
  });
});

