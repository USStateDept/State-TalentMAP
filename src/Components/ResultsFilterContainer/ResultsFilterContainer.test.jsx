import { mount, shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
// import { setupAsyncMocks } from '../testUtilities/testUtilities';
import ResultsFilterContainer from './ResultsFilterContainer';
import { bidderUserObject } from '../../__mocks__/userObject';

describe('ResultsFilterContainerComponent', () => {
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  // const { mockStore } = setupAsyncMocks();
  // let [store] = Array(1);

  // store = mockStore({ clientView: {} });


  const items = [{
    title: 'title', expanded: true,
  }];

  const props = {
    filters: items,
    onQueryParamUpdate: () => {},
    onQueryParamToggle: () => {},
    resetFilters: () => {},
    setAccordion: () => {},
    fetchMissionAutocomplete: () => {},
    missionSearchResults: [],
    missionSearchIsLoading: false,
    missionSearchHasErrored: false,
    fetchPostAutocomplete: () => {},
    postSearchResults: [],
    postSearchIsLoading: false,
    postSearchHasErrored: false,
    userProfile: bidderUserObject,
    isLoading: false,
    showClear: true,
    clientView: {},
    client: {},
  };

  it('is defined', () => {
    const wrapper = shallow(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <ResultsFilterContainer
            {...props}
          />
        </MemoryRouter>
      </Provider>,
      );
    expect(wrapper).toBeDefined();
  });

  it('can receive props', () => {
    const wrapper = mount(
      <Provider store={mockStore({ clientView: {} })}>
        <MemoryRouter>
          <ResultsFilterContainer
            {...props}
          />
        </MemoryRouter>
      </Provider>,
      );
    console.log('===');
    console.log(wrapper.instance().props);
    console.log('===');
    expect(wrapper.instance().props.filters).toBe(items);
  });

  it('is defined after receiving new props', () => {
    const wrapper = shallow(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <ResultsFilterContainer
            {...props}
          />
        </MemoryRouter>
      </Provider>,
      );
    wrapper.setProps({ newProp: 'abz' });
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <ResultsFilterContainer
            {...props}
          />
        </MemoryRouter>
      </Provider>,
      );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when isLoading === true', () => {
    const wrapper = shallow(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <ResultsFilterContainer
            {...props}
            isLoading
          />
        </MemoryRouter>
      </Provider>,
      );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
