import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import ResultsPage from './ResultsPage';
import { POSITION_SEARCH_SORTS, POSITION_PAGE_SIZES } from '../../Constants/Sort';
import resultsObject from '../../__mocks__/resultsObject';

describe('ResultsPageComponent', () => {
  let wrapper = null;

  const defaultSort = '';
  const defaultPageSize = 10;

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
    />);
    wrapper.instance().onChildToggle();
    expect(wrapper).toBeDefined();
  });

  it('can call the queryParamUpdate function', () => {
    wrapper = shallow(<ResultsPage
      results={resultsObject}
      sortBy={POSITION_SEARCH_SORTS}
      defaultSort={defaultSort}
      pageSizes={POSITION_PAGE_SIZES}
      defaultPageSize={defaultPageSize}
      queryParamUpdate={() => {}}
    />);
    // define the instance
    const instance = wrapper.instance();
    // spy the queryParamUpdate function
    const handleUpdateSpy = sinon.spy(instance, 'queryParamUpdate');
    wrapper.instance().queryParamUpdate();
    sinon.assert.calledOnce(handleUpdateSpy);
  });
});
