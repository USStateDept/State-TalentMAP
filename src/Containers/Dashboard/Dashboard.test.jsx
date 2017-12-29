import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { testDispatchFunctions } from '../../testUtilities/testUtilities';
import DashboardContainer, { mapDispatchToProps } from './Dashboard';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('DashboardContainer', () => {
  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <DashboardContainer />
    </MemoryRouter></Provider>);
    expect(wrapper).toBeDefined();
  });
});

describe('mapDispatchToProps', () => {
  testDispatchFunctions(mapDispatchToProps);
});
