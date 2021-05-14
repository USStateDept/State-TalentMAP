import { shallow } from 'enzyme';
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

  it('can receive props', () => {
    wrapper = shallow(<ResultsPage.WrappedComponent
      {...props}
    />);
    expect(wrapper.instance().props.results.results[0].position.id).toBe(6);
  });

  it('can receive props', () => {
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
