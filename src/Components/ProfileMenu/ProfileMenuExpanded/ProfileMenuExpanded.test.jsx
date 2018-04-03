import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import ProfileMenuExpanded from './ProfileMenuExpanded';

describe('ProfileMenuExpandedComponent', () => {
  const props = {
    isCDO: true,
    isGlossaryEditor: true,
    collapse: () => {},
    toggleMenuSection: () => {},
  };

  it('is defined', () => {
    const wrapper = shallow(
      <ProfileMenuExpanded {...props} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot when isCDO is false', () => {
    const wrapper = shallow(
      <ProfileMenuExpanded {...props} isCDO={false} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when isGlossaryEditor is false', () => {
    const wrapper = shallow(
      <ProfileMenuExpanded {...props} isGlossaryEditor={false} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when isCDO is true', () => {
    const wrapper = shallow(<ProfileMenuExpanded {...props} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when user is bidcycle_admin', () => {
    const roles = ['bidcycle_admin'];
    const wrapper = shallow(<ProfileMenuExpanded {...props} roles={roles} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
