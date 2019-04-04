import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { testDispatchFunctions } from '../../testUtilities/testUtilities';
import MockTestProvider from '../../testUtilities/MockProvider';
import Profile, { mapDispatchToProps } from './Profile';

describe('Profile', () => {
  it('is defined', () => {
    const profile = TestUtils.renderIntoDocument(<MockTestProvider>
      <Profile
        isAuthorized={() => true}
        onNavigateTo={() => {}}
      />
    </MockTestProvider>);
    expect(profile).toBeDefined();
  });

  it('can handle authentication redirects', () => {
    const profile = TestUtils.renderIntoDocument(<MockTestProvider>
      <Profile
        isAuthorized={() => false}
        onNavigateTo={() => {}}
      />
    </MockTestProvider>);
    expect(profile).toBeDefined();
  });
});

describe('mapDispatchToProps', () => {
  const config = {
    onNavigateTo: ['/results'],
  };
  testDispatchFunctions(mapDispatchToProps, config);
});
