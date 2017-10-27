import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import BidListContainer from './BidList';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('BidListContainer', () => {
  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <BidListContainer
        isAuthorized={() => true}
        onNavigateTo={() => {}}
        savedSearchesFetchData={() => {}}
        setCurrentSavedSearch={() => {}}
        deleteSearch={() => {}}
      />
    </MemoryRouter></Provider>);
    expect(wrapper).toBeDefined();
  });
});
