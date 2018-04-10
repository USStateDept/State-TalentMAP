import React from 'react';
import { shallow } from 'enzyme';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import { testDispatchFunctions } from '../../testUtilities/testUtilities';
import SavedSearchesContainer, { mapDispatchToProps } from './SavedSearches';
import SavedSearchesList from '../../Components/ProfileDashboard/SavedSearches/SavedSearchesList';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('SavedSearchesContainer', () => {
  const ChildElement = SavedSearchesList;
  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <SavedSearchesContainer
        onNavigateTo={() => {}}
        savedSearchesFetchData={() => {}}
        setCurrentSavedSearch={() => {}}
        deleteSearch={() => {}}
        ChildElement={ChildElement}
        mappedParams={[]}
      />
    </MemoryRouter></Provider>);
    expect(wrapper).toBeDefined();
  });

  it('can call the goToSavedSearch function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <SavedSearchesContainer.WrappedComponent
        onNavigateTo={spy}
        fetchData={() => {}}
        savedSearchesFetchData={() => {}}
        setCurrentSavedSearch={() => {}}
        deleteSearch={() => {}}
        ChildElement={ChildElement}
        mappedParams={[]}
      />,
    );
    wrapper.instance().goToSavedSearch({ filters: { q: 'test' } });
    sinon.assert.calledOnce(spy);
  });

  it('can call the getSortedSearches function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <SavedSearchesContainer.WrappedComponent
        onNavigateTo={() => {}}
        fetchData={() => {}}
        savedSearchesFetchData={spy}
        setCurrentSavedSearch={() => {}}
        deleteSearch={() => {}}
        ChildElement={ChildElement}
        mappedParams={[]}
      />,
    );
    wrapper.instance().getSortedSearches({ target: { value: 'title' } });
    // fetchData is called once at mount,
    // and should be called twice after getSortedFavorites is called.
    sinon.assert.calledTwice(spy);
  });
});

describe('mapDispatchToProps', () => {
  const config = {
    onNavigateTo: ['/details'],
    setCurrentSavedSearch: [{}],
    deleteSearch: ['1'],
    cloneSearch: ['1'],
  };
  testDispatchFunctions(mapDispatchToProps, config);
});
