import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import MaintainELPositions from './MaintainELPositions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('MaintainELPositions', () => {
  let store;

  beforeEach(() => {
    const initialState = {
      entryLevelSelections: {
        page: 1,
        limit: 10,
        selectedTps: [],
        selectedBureaus: [],
        selectedOrgs: [],
        selectedGrades: [],
        selectedSkills: [],
        selectedJobs: [],
        selectedLanguages: [],
        overseas: false,
        domestic: false,
      },
      entryLevelFiltersFetchDataErrored: false,
      entryLevelFiltersFetchDataLoading: false,
      entryLevelFilters: {
        tpFilters: [],
        bureauFilters: [],
        orgFilters: [],
        gradeFilters: [],
        skillsFilters: [],
        jcFilters: [],
        languageFilters: [],
      },
      entryLevelFetchDataErrored: false,
      entryLevelFetchDataLoading: false,
      entryLevelPositions: {
        results: [],
        count: 0,
      },
    };
    store = mockStore(initialState);
  });

  it('mounts', () => {
    const wrapper = TestUtils.renderIntoDocument(
      <Provider store={store}>
        <MemoryRouter>
          <MaintainELPositions />
        </MemoryRouter>
      </Provider>,
    );
    expect(wrapper).toBeDefined();
  });

  it('renders the search input', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <MaintainELPositions />
        </MemoryRouter>
      </Provider>,
    );
    expect(wrapper.find('input[placeholder="Search using Position Number, Position Title, Bureau, Org, Skill, or Language (i.e FR)"]').exists()).toBe(true);
  });

  it('renders the filters', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <MaintainELPositions />
        </MemoryRouter>
      </Provider>,
    );
    expect(wrapper.find('.label').at(0).text()).toBe('Tracking Program:');
    expect(wrapper.find('.label').at(1).text()).toBe('Bureau:');
    expect(wrapper.find('.label').at(2).text()).toBe('Location/Org:');
    expect(wrapper.find('.label').at(3).text()).toBe('Grade:');
    expect(wrapper.find('.label').at(4).text()).toBe('Skill:');
    expect(wrapper.find('.label').at(5).text()).toBe('Job Categories:');
    expect(wrapper.find('.label').at(6).text()).toBe('Languages:');
  });

  it('handles search input', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <MaintainELPositions />
        </MemoryRouter>
      </Provider>,
    );
    wrapper.find('input[placeholder="Search using Position Number, Position Title, Bureau, Org, Skill, or Language (i.e FR)"]').simulate('change', { target: { value: 'test search' } });
    expect(wrapper.find('input[placeholder="Search using Position Number, Position Title, Bureau, Org, Skill, or Language (i.e FR)"]').prop('value')).toBe('test search');
  });

  it('handles position number input', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <MaintainELPositions />
        </MemoryRouter>
      </Provider>,
    );
    wrapper.find('input[placeholder="Add position numbers"]').simulate('change', { target: { value: '12345678' } });
    wrapper.find('.add-button').at(0).simulate('click');
    expect(wrapper.find('.pill').text()).toContain('12345678');
  });
});
