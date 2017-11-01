import React from 'react';
import { shallow } from 'enzyme';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import SavedSearchesContainer from './SavedSearches';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('SavedSearchesContainer', () => {
  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <SavedSearchesContainer
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
      <SavedSearchesContainer.WrappedComponent
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
