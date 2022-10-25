import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import PanelMeetingAgenda from './PanelMeetingAgenda';
import filters from '../../../__mocks__/filtersArray';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('PanelMeetingAgendaComponent', () => {
  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <PanelMeetingAgenda />
        </MemoryRouter>
      </Provider>,
    );
    expect(wrapper).toBeDefined();
  });

  it('handles loading', () => {
    const wrapper = TestUtils.renderIntoDocument(
      <Provider store={mockStore({
        filterData: [],
        filtersIsLoading: true,
      })}
      >
        <MemoryRouter>
          <PanelMeetingAgenda />
        </MemoryRouter>
      </Provider>,
    );
    expect(wrapper).toBeDefined();
  });

  it('handles not loading', () => {
    const wrapper = TestUtils.renderIntoDocument(
      <Provider store={mockStore({
        filterData: filters,
        filtersIsLoading: false,
      })}
      >
        <MemoryRouter>
          <PanelMeetingAgenda />
        </MemoryRouter>
      </Provider>,
    );
    expect(wrapper).toBeDefined();
  });
});
