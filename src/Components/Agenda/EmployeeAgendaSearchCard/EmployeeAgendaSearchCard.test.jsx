import toJSON from 'enzyme-to-json';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import EmployeeAgendaSearchCard from './EmployeeAgendaSearchCard';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('EmployeeAgendaSearchCards', () => {
  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <EmployeeAgendaSearchCard />
        </MemoryRouter>
      </Provider>,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = TestUtils.renderIntoDocument(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <EmployeeAgendaSearchCard />
        </MemoryRouter>
      </Provider>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
