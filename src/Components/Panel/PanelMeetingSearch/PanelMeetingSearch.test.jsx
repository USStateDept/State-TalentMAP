import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import toJSON from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import PanelMeetingSearch from './PanelMeetingSearch';
import filters from '../../../__mocks__/filtersArray';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('PanelMeetingSearchComponent', () => {
  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <PanelMeetingSearch isCDO />
        </MemoryRouter>
      </Provider>,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot when CDO', () => {
    const wrapper = shallow(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <PanelMeetingSearch isCDO />
        </MemoryRouter>
      </Provider>,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when not CDO', () => {
    const wrapper = shallow(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <PanelMeetingSearch isCDO={false} />
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
          <PanelMeetingSearch />
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
          <PanelMeetingSearch />
        </MemoryRouter>
      </Provider>,
    );
    expect(wrapper).toBeDefined();
  });
});
