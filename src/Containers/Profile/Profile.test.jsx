import React from 'react';
import { shallow } from 'enzyme';
import { testDispatchFunctions } from '../../testUtilities/testUtilities';
import Profile, { mapDispatchToProps } from './Profile';

describe('Profile', () => {
  it('is defined', () => {
    const profile = shallow(
      <Profile.WrappedComponent
        isAuthorized={() => true}
        onNavigateTo={() => {}}
      />,
    );
    expect(profile).toBeDefined();
  });

  it('can handle authentication redirects', () => {
    const profile = shallow(
      <Profile.WrappedComponent
        isAuthorized={() => false}
        onNavigateTo={() => {}}
      />,
    );
    expect(profile).toBeDefined();
  });
});

describe('mapDispatchToProps', () => {
  const config = {
    onNavigateTo: ['/results'],
  };
  testDispatchFunctions(mapDispatchToProps, config);
});
