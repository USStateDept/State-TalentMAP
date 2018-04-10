import React from 'react';
import { shallow } from 'enzyme';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { testDispatchFunctions } from '../../testUtilities/testUtilities';
import SavedSearchesMap, { mapDispatchToProps } from './SavedSearchesMap';
import SavedSearchesList from '../../Components/ProfileDashboard/SavedSearches/SavedSearchesList';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('SavedSearchesMapContainer', () => {
  const ChildElement = SavedSearchesList;
  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <SavedSearchesMap
        onNavigateTo={() => {}}
        savedSearchesFetchData={() => {}}
        setCurrentSavedSearch={() => {}}
        deleteSearch={() => {}}
        ChildElement={ChildElement}
        onSortChange={() => {}}
      />
    </MemoryRouter></Provider>);
    expect(wrapper).toBeDefined();
  });

  it('calls fetchFilters if filters.hasFetched is true and savedSearchesIsLoading is false', () => {
    let setArgsAgainst = [];
    function spy(...rest) {
      setArgsAgainst = [...rest];
    }
    const wrapper = shallow(
      <SavedSearchesMap.WrappedComponent
        onNavigateTo={() => {}}
        fetchData={() => {}}
        savedSearchesFetchData={() => {}}
        setCurrentSavedSearch={() => {}}
        deleteSearch={() => {}}
        ChildElement={ChildElement}
        fetchFilters={spy}
        filtersIsLoading={false}
        onSortChange={() => {}}
        savedSearchesIsLoading={false}
      />,
    );
    wrapper.setProps({ filters: { ...wrapper.instance().props.filters, hasFetched: true } });
    expect(setArgsAgainst.length).toBe(3);
  });

  it('calls fetchFilters if filters.hasFetched is false and savedSearchesIsLoading is false', () => {
    let setArgsAgainst = [];
    function spy(...rest) {
      setArgsAgainst = [...rest];
    }
    const wrapper = shallow(
      <SavedSearchesMap.WrappedComponent
        onNavigateTo={() => {}}
        fetchData={() => {}}
        savedSearchesFetchData={() => {}}
        setCurrentSavedSearch={() => {}}
        deleteSearch={() => {}}
        ChildElement={ChildElement}
        fetchFilters={spy}
        filtersIsLoading={false}
        onSortChange={() => {}}
        savedSearchesIsLoading={false}
      />,
    );
    wrapper.setProps({ filters: { ...wrapper.instance().props.filters, hasFetched: false } });
    expect(setArgsAgainst.length).toBe(2);
  });
});

describe('mapDispatchToProps', () => {
  const config = {
    fetchFilters: [{}, {}, {}],
  };
  testDispatchFunctions(mapDispatchToProps, config);
});
