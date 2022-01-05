import { shallow } from 'enzyme';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import BureauPage from './BureauPage';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('BureauPage', () => {
  it('mounts', () => {
    const wrapper = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <BureauPage />
    </MemoryRouter></Provider>);
    expect(wrapper).toBeDefined();
  });

  it('is defined', () => {
    const wrapper = shallow(<BureauPage />);
    expect(wrapper).toBeDefined();
  });
});
