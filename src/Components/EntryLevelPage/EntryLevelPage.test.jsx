import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import TestUtils from 'react-dom/test-utils';
import EntryLevelPage from './EntryLevelPage';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('EntryLevelPage', () => {
  it('mounts', () => {
    const wrapper = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <EntryLevelPage />
    </MemoryRouter></Provider>);
    expect(wrapper).toBeDefined();
  });

  it('is defined', () => {
    const wrapper = shallow(<EntryLevelPage />);
    expect(wrapper).toBeDefined();
  });
});
