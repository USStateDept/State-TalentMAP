import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import ProfileMenu from './ProfileMenu';

describe('ProfileMenuComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <ProfileMenu />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <ProfileMenu />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
