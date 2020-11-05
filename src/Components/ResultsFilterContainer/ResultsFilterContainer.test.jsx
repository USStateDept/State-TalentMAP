import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import ResultsFilterContainer from './ResultsFilterContainer';
import { bidderUserObject } from '../../__mocks__/userObject';

describe('ResultsFilterContainerComponent', () => {
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
  };

  it('is defined', () => {
    const wrapper = shallow(
      <ResultsFilterContainer
        {...props}
      />);
    expect(wrapper).toBeDefined();
  });

  it('can receive props', () => {
    const wrapper = shallow(<ResultsFilterContainer
      {...props}
    />);
    expect(wrapper.instance().props.filters).toBe(items);
  });

  it('is defined after receiving new props', () => {
    const wrapper = shallow(<ResultsFilterContainer
      {...props}
    />);
    wrapper.setProps({ newProp: 'abz' });
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<ResultsFilterContainer
      {...props}
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when isLoading === true', () => {
    const wrapper = shallow(<ResultsFilterContainer
      {...props}
      isLoading
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
