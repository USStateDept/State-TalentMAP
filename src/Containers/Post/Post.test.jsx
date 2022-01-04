import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Post from './Post';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Post', () => {
  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <Post />
    </MemoryRouter></Provider>);
    expect(wrapper).toBeDefined();
  });
});

