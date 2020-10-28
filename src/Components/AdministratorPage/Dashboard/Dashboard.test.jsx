import { shallow } from 'enzyme';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Dashboard from './Dashboard';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Dashboard', () => {
  const props = {
    isLoading: false,
    logsIsLoading: false,
    onDownloadClick: () => {},
  };

  it('mounts', () => {
    const wrapper = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <Dashboard />
    </MemoryRouter></Provider>);
    expect(wrapper).toBeDefined();
  });

  it('is defined', () => {
    const wrapper = shallow(<Dashboard {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('is defined when loading states are true', () => {
    const wrapper = shallow(<Dashboard {...props} isLoading logsIsLoading />);
    expect(wrapper).toBeDefined();
  });
});
