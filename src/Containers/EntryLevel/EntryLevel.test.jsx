import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import TestUtils from 'react-dom/test-utils';
import EntryLevelContainer from './EntryLevel';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('EntryLevel', () => {
  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <EntryLevelContainer />
    </MemoryRouter></Provider>);
    expect(wrapper).toBeDefined();
  });
});

