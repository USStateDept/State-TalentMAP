import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import ResultsContainer, { mapDispatchToProps } from './ResultsContainer';
import { testDispatchFunctions } from '../../testUtilities/testUtilities';
import resultsObject from '../../__mocks__/resultsObject';

describe('ResultsContainerComponent', () => {
  let wrapper = null;

  const config = {
    isLoading: true,
    onQueryParamUpdate: () => {},
    sortBy: { options: [{ value: 'sort', text: 'sort' }] },
    pageSizes: { options: [{ value: 10, text: '10' }] },
    pageSize: 10,
    hasLoaded: true,
    onToggle: () => {},
    totalResults: 101,
  };

  const { isLoading, onQueryParamUpdate, totalResults,
    sortBy, pageSizes, pageSize, hasLoaded, onToggle } = config;

  it('is defined', () => {
    wrapper = shallow(
      <ResultsContainer.WrappedComponent
        results={resultsObject}
        isLoading={isLoading}
        queryParamUpdate={onQueryParamUpdate}
        sortBy={sortBy}
        pageSizes={pageSizes}
        pageSize={pageSize}
        totalResuls={totalResults}
        hasLoaded={hasLoaded}
        onToggle={onToggle}
        onQueryParamToggle={() => {}}
        saveSearch={() => {}}
        newSavedSearchSuccess={{}}
        newSavedSearchHasErrored={false}
        newSavedSearchIsSaving={false}
        resetSavedSearchAlerts={() => {}}
        bidList={[]}
      />);
    expect(wrapper).toBeDefined();
  });

  it('can receive props', () => {
    wrapper = shallow(<ResultsContainer.WrappedComponent
      results={resultsObject}
      isLoading={isLoading}
      queryParamUpdate={onQueryParamUpdate}
      sortBy={sortBy}
      pageSizes={pageSizes}
      pageSize={pageSize}
      totalResuls={totalResults}
      hasLoaded={hasLoaded}
      onToggle={onToggle}
      onQueryParamToggle={() => {}}
      saveSearch={() => {}}
      newSavedSearchSuccess={{}}
      newSavedSearchHasErrored={false}
      newSavedSearchIsSaving={false}
      resetSavedSearchAlerts={() => {}}
      bidList={[]}
    />);
    expect(wrapper.instance().props.pageSizes).toBe(pageSizes);
  });

  it('can receive different types of results', () => {
    wrapper = shallow(<ResultsContainer.WrappedComponent
      results={{ results: [] }}
      isLoading={!isLoading}
      queryParamUpdate={onQueryParamUpdate}
      sortBy={sortBy}
      pageSizes={pageSizes}
      pageSize={20}
      totalResuls={totalResults}
      hasLoaded={false}
      onToggle={onToggle}
      onQueryParamToggle={() => {}}
      saveSearch={() => {}}
      newSavedSearchSuccess={{}}
      newSavedSearchHasErrored={false}
      newSavedSearchIsSaving={false}
      resetSavedSearchAlerts={() => {}}
      bidList={[]}
    />);
    expect(wrapper.instance().props.pageSize).toBe(20);
  });

  it('can call the onPageChange function', () => {
    const spy = sinon.spy();
    const scrollSpy = sinon.spy();
    wrapper = shallow(<ResultsContainer.WrappedComponent
      results={{ results: [] }}
      isLoading={!isLoading}
      queryParamUpdate={spy}
      sortBy={sortBy}
      pageSizes={pageSizes}
      pageSize={20}
      totalResuls={totalResults}
      hasLoaded={false}
      onToggle={onToggle}
      onQueryParamToggle={() => {}}
      saveSearch={() => {}}
      newSavedSearchSuccess={{}}
      newSavedSearchHasErrored={false}
      newSavedSearchIsSaving={false}
      scrollToTop={scrollSpy}
      resetSavedSearchAlerts={() => {}}
      bidList={[]}
    />);
    wrapper.instance().onPageChange(1);
    sinon.assert.calledOnce(spy);
    sinon.assert.calledOnce(scrollSpy);
  });

  it('calls queryParamUpdate on onSelectOrdering()', () => {
    const spy = sinon.spy();
    wrapper = shallow(<ResultsContainer.WrappedComponent
      results={{ results: [] }}
      isLoading={!isLoading}
      queryParamUpdate={spy}
      sortBy={sortBy}
      pageSizes={pageSizes}
      pageSize={20}
      totalResuls={totalResults}
      hasLoaded={false}
      onToggle={onToggle}
      onQueryParamToggle={() => {}}
      saveSearch={() => {}}
      newSavedSearchSuccess={{}}
      newSavedSearchHasErrored={false}
      newSavedSearchIsSaving={false}
      scrollToTop={() => {}}
      resetSavedSearchAlerts={() => {}}
      bidList={[]}
    />);
    wrapper.instance().onSelectOrdering({ target: { value: 1 } });
    sinon.assert.calledOnce(spy);
  });

  it('matches snapshot', () => {
    wrapper = shallow(<ResultsContainer.WrappedComponent
      results={resultsObject}
      isLoading={isLoading}
      queryParamUpdate={onQueryParamUpdate}
      sortBy={sortBy}
      pageSizes={pageSizes}
      pageSize={pageSize}
      totalResuls={totalResults}
      hasLoaded={hasLoaded}
      onToggle={onToggle}
      onQueryParamToggle={() => {}}
      saveSearch={() => {}}
      newSavedSearchSuccess={{}}
      newSavedSearchHasErrored={false}
      newSavedSearchIsSaving={false}
      resetSavedSearchAlerts={() => {}}
      bidList={[]}
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});

describe('mapDispatchToProps', () => {
  testDispatchFunctions(mapDispatchToProps);
});
