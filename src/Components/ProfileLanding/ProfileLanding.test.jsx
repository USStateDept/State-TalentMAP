import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import ProfileLanding from './ProfileLanding';

describe('ProfileLandingComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <ProfileLanding />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <ProfileLanding />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
