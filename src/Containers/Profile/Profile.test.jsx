import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { testDispatchFunctions } from '../../testUtilities/testUtilities';
import Profile, { mapDispatchToProps } from './Profile';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Profile', () => {
  it('is defined', () => {
    const profile = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <Profile
        isAuthorized={() => true}
        onNavigateTo={() => {}}
      />
    </MemoryRouter></Provider>);
    expect(profile).toBeDefined();
  });

  it('can handle authentication redirects', () => {
    const profile = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <Profile
        isAuthorized={() => false}
        onNavigateTo={() => {}}
      />
    </MemoryRouter></Provider>);
    expect(profile).toBeDefined();
  });
});

describe('mapDispatchToProps', () => {
  const config = {
    onNavigateTo: ['/results'],
  };
  testDispatchFunctions(mapDispatchToProps, config);
});
