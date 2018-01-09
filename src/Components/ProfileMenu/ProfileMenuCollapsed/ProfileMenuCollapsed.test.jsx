import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import ProfileMenuCollapsed from './ProfileMenuCollapsed';

describe('ProfileMenuCollapsedComponent', () => {
  const props = {
    expand: () => {},
    toggleMenuSection: () => {},
  };

  it('is defined', () => {
    const wrapper = shallow(
      <ProfileMenuCollapsed {...props} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <ProfileMenuCollapsed {...props} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
