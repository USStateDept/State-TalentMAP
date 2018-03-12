import React from 'react';
import { shallow } from 'enzyme';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import { testDispatchFunctions } from '../../testUtilities/testUtilities';
import SavedSearchesMap, { mapDispatchToProps } from './SavedSearchesMap';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('SavedSearchesContainer', () => {
  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <SavedSearchesMap
        onNavigateTo={() => {}}
        savedSearchesFetchData={() => {}}
        setCurrentSavedSearch={() => {}}
        deleteSearch={() => {}}
      />
    </MemoryRouter></Provider>);
    expect(wrapper).toBeDefined();
  });

  it('can call the goToSavedSearch function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <SavedSearchesMap.WrappedComponent
        onNavigateTo={spy}
        fetchData={() => {}}
        savedSearchesFetchData={() => {}}
        setCurrentSavedSearch={() => {}}
        deleteSearch={() => {}}
      />,
    );
    wrapper.instance().goToSavedSearch({ filters: { q: 'test' } });
    sinon.assert.calledOnce(spy);
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
