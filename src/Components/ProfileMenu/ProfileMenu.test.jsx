import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import ProfileMenu from './ProfileMenu';

describe('ProfileMenuComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <ProfileMenu isCDO />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot when isCDO is false', () => {
    const wrapper = shallow(
      <ProfileMenu isCDO={false} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when isCDO is true', () => {
    const wrapper = shallow(
      <ProfileMenu isCDO />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
