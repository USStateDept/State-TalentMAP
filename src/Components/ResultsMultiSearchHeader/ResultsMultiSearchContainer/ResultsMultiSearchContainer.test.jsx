import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { testDispatchFunctions } from '../../../testUtilities/testUtilities';
import ResultsMultiSearchContainer, { mapDispatchToProps } from './ResultsMultiSearchContainer';
import filters from '../../../__mocks__/filtersArray';
import { bidderUserObject } from '../../../__mocks__/userObject';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('ResultsMultiSearchContainer', () => {
  const props = {
    filters: { filters },
    userProfile: bidderUserObject,
    fetchFilters: () => {},
    onNavigateTo: () => {},
    history: { location: { pathname: '/results' } },
  };

  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(
      <Provider {...props} store={mockStore({})}><MemoryRouter>
        <ResultsMultiSearchContainer />
      </MemoryRouter></Provider>);
    expect(wrapper).toBeDefined();
  });

  it('can call the onFilterChange function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <ResultsMultiSearchContainer.WrappedComponent
        {...props}
        setSearchFilters={spy}
      />,
    );
    wrapper.instance().onFilterChange({});
    sinon.assert.calledOnce(spy);
  });

  it('can form a query with the onSubmit function', () => {
    const url = { value: '' };
    function navigateTo(value) { url.value = value; }
    const wrapper = shallow(
      <ResultsMultiSearchContainer.WrappedComponent
        {...props}
        onNavigateTo={navigateTo}
      />,
    );
    wrapper.instance().onSubmit({ q: 'german', otherFilters: ['1', '2'], emptyFilters: [] });
    expect(url.value).toBe('/results?otherFilters=1%2C2&q=german');
  });

  it('can perform actions upon componentWillMount', () => {
    const fetchFiltersSpy = sinon.spy();
    const wrapper = shallow(<ResultsMultiSearchContainer.WrappedComponent
      {...props}
      fetchFilters={fetchFiltersSpy}
      filters={{ ...props.filters, hasFetched: true }}
    />);
    wrapper.update();
    // define the instance
    sinon.assert.calledOnce(fetchFiltersSpy);
  });

  it('does not fetch filters if the current route exists in the bypassRoutes', () => {
    const fetchFiltersSpy = sinon.spy();
    const wrapper = shallow(<ResultsMultiSearchContainer.WrappedComponent
      {...props}
      fetchFilters={fetchFiltersSpy}
      filters={{ ...props.filters, hasFetched: true }}
      history={{ location: { pathname: '/profile/dashboard' } }}
    />);
    wrapper.update();
    sinon.assert.callCount(fetchFiltersSpy, 0);
  });


  it('fetches filters if the current route does not exist in the bypassRoutes', () => {
    const fetchFiltersSpy = sinon.spy();
    const wrapper = shallow(<ResultsMultiSearchContainer.WrappedComponent
      {...props}
      fetchFilters={fetchFiltersSpy}
      filters={{ ...props.filters, hasFetched: true }}
      history={{ location: { pathname: '/profile/favorites' } }}
    />);
    wrapper.update();
    sinon.assert.callCount(fetchFiltersSpy, 1);
  });
});

describe('mapDispatchToProps', () => {
  const config = {
    fetchFilters: [{}],
    onNavigateTo: ['/test'],
    setSearchFilters: [{}],
  };
  testDispatchFunctions(mapDispatchToProps, config);
});
