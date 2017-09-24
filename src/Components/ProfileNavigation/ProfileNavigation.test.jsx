import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import ProfileNavigation from './ProfileNavigation';

describe('ProfileNavigationComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <ProfileNavigation />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <ProfileNavigation />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
