import { shallow } from 'enzyme';
import { STATUS } from 'react-joyride';
import ResultsPage from './ResultsPage';
import { POSITION_PAGE_SIZES, POSITION_SEARCH_SORTS } from '../../Constants/Sort';
import resultsObject from '../../__mocks__/resultsObject';

describe('ResultsPageComponent', () => {
  let wrapper = null;

  const defaultSort = '';
  const defaultPageSize = 10;

  const items = [{
    item: { title: 'title', selectionRef: 'ref' },
    data: [{ isSelected: true }],
  },
  {
    item: { title: 'title2', selectionRef: 'ref2' },
    data: [{ isSelected: false }],
  },
  ];

  const props = {
    results: resultsObject,
    hasErrored: true,
    isLoading: false,
    sortBy: POSITION_SEARCH_SORTS,
    defaultSort,
    pageSizes: POSITION_PAGE_SIZES,
    defaultPageSize,
    onQueryParamUpdate: () => {},
    resetFilters: () => {},
    onQueryParamToggle: () => {},
    setAccordion: () => {},
    filters: items,
    onUpdate: () => {},
    saveSearch: () => {},
    newSavedSearchSuccess: {},
    newSavedSearchHasErrored: false,
    newSavedSearchIsSaving: false,
    resetSavedSearchAlerts: () => {},
    fetchMissionAutocomplete: () => {},
    missionSearchResults: [],
    missionSearchIsLoading: false,
    missionSearchHasErrored: false,
    fetchPostAutocomplete: () => {},
    postSearchResults: [],
    postSearchIsLoading: false,
    postSearchHasErrored: false,
    shouldShowSearchBar: true,
    bidList: [],
    filtersIsLoading: false,
  };

  it('is defined', () => {
    wrapper = shallow(<ResultsPage.WrappedComponent
      {...props}
    />);
    expect(wrapper).toBeDefined();
  });

  it('updates when props are not equal', () => {
    wrapper = shallow(<ResultsPage.WrappedComponent
      {...props}
    />);
    expect(wrapper.instance().shouldComponentUpdate({})).toBe(true);
  });

  it('sets state when the FINISHED or SKIPPED value is passed to handleJoyrideCallback', () => {
    wrapper = shallow(<ResultsPage.WrappedComponent
      {...props}
    />);
    wrapper.instance().setState({ run: true });

    wrapper.instance().handleJoyrideCallback({ status: 'other' });
    expect(wrapper.instance().state.run).toBe(true);

    wrapper.instance().handleJoyrideCallback({ status: STATUS.FINISHED });
    expect(wrapper.instance().state.run).toBe(false);

    wrapper.instance().handleJoyrideCallback({ status: STATUS.SKIPPED });
    expect(wrapper.instance().state.run).toBe(false);

    wrapper.instance().handleJoyrideCallback({ status: 'other' });
    expect(wrapper.instance().state.run).toBe(false);
  });

  // TODO - need screen width set for this to work
  xit('sets state when handleTutorialButtonClick is called', () => {
    wrapper = shallow(<ResultsPage.WrappedComponent
      {...props}
    />);
    expect(wrapper.instance().state.run).toBe(false);
    wrapper.find('.tutorial-button').simulate('click');
    expect(wrapper.instance().state.run).toBe(true);
  });

  it('receives props', () => {
    wrapper = shallow(<ResultsPage.WrappedComponent
      {...props}
    />);
    expect(wrapper.instance().props.results.results[0].position.id).toBe(6);
  });

  it('receives props 2', () => {
    wrapper = shallow(<ResultsPage.WrappedComponent
      hasErrored={false}
      isLoading={false}
      sortBy={POSITION_SEARCH_SORTS}
      defaultSort={defaultSort}
      pageSizes={POSITION_PAGE_SIZES}
      defaultPageSize={defaultPageSize}
      onQueryParamUpdate={() => {}}
      resetFilters={() => {}}
      onQueryParamToggle={() => {}}
      setAccordion={() => {}}
      filters={items}
      onUpdate={() => {}}
      saveSearch={() => {}}
      newSavedSearchSuccess={{}}
      newSavedSearchHasErrored={false}
      newSavedSearchIsSaving={false}
      resetSavedSearchAlerts={() => {}}
      fetchMissionAutocomplete={() => {}}
      missionSearchResults={[]}
      missionSearchIsLoading={false}
      missionSearchHasErrored={false}
      fetchPostAutocomplete={() => {}}
      postSearchResults={[]}
      postSearchIsLoading={false}
      postSearchHasErrored={false}
      shouldShowSearchBar
      bidList={[]}
      filtersIsLoading={false}
    />);
    expect(wrapper).toBeDefined();
  });
});
