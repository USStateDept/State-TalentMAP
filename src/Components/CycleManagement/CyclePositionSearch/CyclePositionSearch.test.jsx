import TestUtils from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import CyclePositionSearch from './CyclePositionSearch';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// Define the initial state for the mock store
const initialState = {
  userProfile: {
    bureau_permissions: [
      { code: '010000', long_description: 'OFFICE OF THE SECRETARY', short_description: 'S' },
      { code: '020000', long_description: 'OFFICE OF THE DEPUTY SECRETARY', short_description: 'DS' },
    ],
  },
  cyclePosFilters: {
    bureauFilter: [
      { code: '010000', long_description: 'OFFICE OF THE SECRETARY' },
      { code: '030000', long_description: 'OFFICE OF THE UNDER SECRETARY' },
    ],
  },
};

// Create the mock store
let store;

beforeEach(() => {
  store = mockStore(initialState);
});

describe('CyclePositionSearch Component', () => {
  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(
      <Provider store={store}>
        <MemoryRouter>
          <CyclePositionSearch viewType="administrator" />
        </MemoryRouter>
      </Provider>,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <MemoryRouter>
          <CyclePositionSearch />
        </MemoryRouter>
      </Provider>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
