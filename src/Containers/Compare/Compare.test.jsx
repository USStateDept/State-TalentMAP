import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { testDispatchFunctions } from '../../testUtilities/testUtilities';
import Compare, { mapDispatchToProps } from './Compare';
import routerLocations from '../../__mocks__/routerLocations';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Main', () => {
  it('is defined', () => {
    const compare = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <Compare
        routerLocations={routerLocations}
        isAuthorized={() => true}
        onNavigateTo={() => {}}
        pageTitle="Compare"
      />
    </MemoryRouter></Provider>);
    expect(compare).toBeDefined();
  });

  it('can handle authentication redirects', () => {
    const compare = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <Compare
        routerLocations={routerLocations}
        isAuthorized={() => false}
        onNavigateTo={() => {}}
        pageTitle="Compare"
      />
    </MemoryRouter></Provider>);
    expect(compare).toBeDefined();
  });
});

describe('mapDispatchToProps', () => {
  const config = {
    fetchData: ['1,2'],
    onNavigateTo: ['/obc/post/1/'],
  };
  testDispatchFunctions(mapDispatchToProps, config);
});
