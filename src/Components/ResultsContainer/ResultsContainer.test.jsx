import { shallow } from 'enzyme';
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import toJSON from 'enzyme-to-json';
import ResultsContainer from './ResultsContainer';
import resultsObject from '../../__mocks__/resultsObject';

describe('ResultsContainerComponent', () => {
  let wrapper = null;

  const config = {
    isLoading: true,
    onQueryParamUpdate: () => {},
    sortBy: { options: [{ value: 'sort', text: 'sort' }] },
    pageSizes: { options: [{ value: 10, text: '10' }] },
    pageCount: 10,
    hasLoaded: true,
    onToggle: () => {},
  };

  const { isLoading, onQueryParamUpdate,
    sortBy, pageSizes, pageCount, hasLoaded, onToggle } = config;

  it('is defined', () => {
    wrapper = TestUtils.renderIntoDocument(<MemoryRouter>
      <ResultsContainer
        results={resultsObject}
        isLoading={isLoading}
        queryParamUpdate={onQueryParamUpdate}
        sortBy={sortBy}
        pageSizes={pageSizes}
        pageCount={pageCount}
        hasLoaded={hasLoaded}
        onToggle={onToggle}
        onQueryParamToggle={() => {}}
        toggleFavorite={() => {}}
        userProfileFavoritePositionIsLoading={false}
        userProfileFavoritePositionHasErrored={false}
        saveSearch={() => {}}
        newSavedSearchSuccess={false}
        newSavedSearchHasErrored={false}
      />
    </MemoryRouter>);
    expect(wrapper).toBeDefined();
  });

  it('can receive props', () => {
    wrapper = shallow(<ResultsContainer
      results={resultsObject}
      isLoading={isLoading}
      queryParamUpdate={onQueryParamUpdate}
      sortBy={sortBy}
      pageSizes={pageSizes}
      pageCount={pageCount}
      hasLoaded={hasLoaded}
      onToggle={onToggle}
      onQueryParamToggle={() => {}}
      toggleFavorite={() => {}}
      userProfileFavoritePositionIsLoading={false}
      userProfileFavoritePositionHasErrored={false}
      saveSearch={() => {}}
      newSavedSearchSuccess={false}
      newSavedSearchHasErrored={false}
    />);
    expect(wrapper.instance().props.pageSizes).toBe(pageSizes);
  });

  it('can receive different types of results', () => {
    wrapper = shallow(<ResultsContainer
      results={{ results: [] }}
      isLoading={!isLoading}
      queryParamUpdate={onQueryParamUpdate}
      sortBy={sortBy}
      pageSizes={pageSizes}
      pageCount={20}
      hasLoaded={false}
      onToggle={onToggle}
      onQueryParamToggle={() => {}}
      toggleFavorite={() => {}}
      userProfileFavoritePositionIsLoading={false}
      userProfileFavoritePositionHasErrored={false}
      saveSearch={() => {}}
      newSavedSearchSuccess={false}
      newSavedSearchHasErrored={false}
    />);
    expect(wrapper.instance().props.pageCount).toBe(20);
  });

  it('matches snapshot', () => {
    wrapper = shallow(<ResultsContainer
      results={resultsObject}
      isLoading={isLoading}
      queryParamUpdate={onQueryParamUpdate}
      sortBy={sortBy}
      pageSizes={pageSizes}
      pageCount={pageCount}
      hasLoaded={hasLoaded}
      onToggle={onToggle}
      onQueryParamToggle={() => {}}
      toggleFavorite={() => {}}
      userProfileFavoritePositionIsLoading={false}
      userProfileFavoritePositionHasErrored={false}
      saveSearch={() => {}}
      newSavedSearchSuccess={false}
      newSavedSearchHasErrored={false}
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
