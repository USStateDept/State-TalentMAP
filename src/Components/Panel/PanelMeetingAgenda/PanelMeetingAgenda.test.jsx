// primary file
import TestUtils from 'react-dom/test-utils';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
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
          <PanelMeetingAgenda isCDO />
        </MemoryRouter>
      </Provider>,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot when CDO', () => {
    const wrapper = shallow(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <PanelMeetingAgenda isCDO />
        </MemoryRouter>
      </Provider>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when not CDO', () => {
    const wrapper = shallow(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <PanelMeetingAgenda isCDO={false} />
        </MemoryRouter>
      </Provider>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
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
