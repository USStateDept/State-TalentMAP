import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Ao from './Ao';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Ao', () => {
  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <Bureau />
    </MemoryRouter></Provider>);
    expect(wrapper).toBeDefined();
  });
});

