import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Settings from './Settings';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('SettingsComponent', () => {
  const props = {
    roles: [],
    bureau_permissions: [],
    org_permissions: [],
  };
  it('is defined', () => {
    const wrapper = shallow(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <Settings {...props} />
        </MemoryRouter>
      </Provider>,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <Settings {...props} />
        </MemoryRouter>
      </Provider>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
