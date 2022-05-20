import toJSON from 'enzyme-to-json';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import EmployeeAgendaSearchRow from './EmployeeAgendaSearchRow';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('EmployeeAgendaSearchRow', () => {
  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <EmployeeAgendaSearchRow />
        </MemoryRouter>
      </Provider>,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = TestUtils.renderIntoDocument(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <EmployeeAgendaSearchRow />
        </MemoryRouter>
      </Provider>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
