import { shallow } from 'enzyme';
import React from 'react';
import ResultsPage from './ResultsPage';
import { POSITION_SEARCH_SORTS, POSITION_PAGE_SIZES } from '../../Constants/Sort';
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

  it('is defined', () => {
    wrapper = shallow(<ResultsPage
      results={resultsObject}
      hasErrored
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
      toggleFavorite={() => {}}
      userProfileFavoritePositionIsLoading={false}
      userProfileFavoritePositionHasErrored={false}
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
      toggleBid={() => {}}
      bidList={[]}
    />);
    expect(wrapper).toBeDefined();
  });

  it('can receive props', () => {
    wrapper = shallow(<ResultsPage
      results={resultsObject}
      hasErrored
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
      toggleFavorite={() => {}}
      userProfileFavoritePositionIsLoading={false}
      userProfileFavoritePositionHasErrored={false}
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
      toggleBid={() => {}}
      bidList={[]}
    />);
    expect(wrapper.instance().props.results.results[0].id).toBe(6);
  });

  it('can receive props', () => {
    wrapper = shallow(<ResultsPage
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
      toggleFavorite={() => {}}
      userProfileFavoritePositionIsLoading={false}
      userProfileFavoritePositionHasErrored={false}
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
      toggleBid={() => {}}
      bidList={[]}
    />);
    expect(wrapper).toBeDefined();
  });

  it('can call the onChildToggle function', () => {
    wrapper = shallow(<ResultsPage
      results={resultsObject}
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
      toggleFavorite={() => {}}
      userProfileFavoritePositionIsLoading={false}
      userProfileFavoritePositionHasErrored={false}
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
      toggleBid={() => {}}
      bidList={[]}
    />);
    wrapper.instance().onChildToggle();
    expect(wrapper).toBeDefined();
  });
});
