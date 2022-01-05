import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import toJSON from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import EmployeeAgendaSearch from './EmployeeAgendaSearch';
import filters from '../../../__mocks__/filtersArray';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('EmployeeAgendaSearchComponent', () => {
  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <EmployeeAgendaSearch isCDO />
        </MemoryRouter>
      </Provider>,
    );
    expect(wrapper).toBeDefined();
  });

  it('handles loading', () => {
    const wrapper = TestUtils.renderIntoDocument(
      <Provider store={mockStore({
        cdos: [],
        cdosIsLoading: true,
        filterData: [],
        filtersIsLoading: true,
      })}
      >
        <MemoryRouter>
          <EmployeeAgendaSearch />
        </MemoryRouter>
      </Provider>,
    );
    expect(wrapper).toBeDefined();
  });

  it('handles not loading', () => {
    const wrapper = TestUtils.renderIntoDocument(
      <Provider store={mockStore({
        cdos: [],
        cdosIsLoading: false,
        filterData: filters,
        filtersIsLoading: false,
      })}
      >
        <MemoryRouter>
          <EmployeeAgendaSearch />
        </MemoryRouter>
      </Provider>,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot when CDO', () => {
    const wrapper = shallow(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <EmployeeAgendaSearch isCDO />
        </MemoryRouter>
      </Provider>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when not CDO', () => {
    const wrapper = shallow(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <EmployeeAgendaSearch isCDO={false} />
        </MemoryRouter>
      </Provider>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
