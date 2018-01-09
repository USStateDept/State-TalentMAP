import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { PROFILE_MENU_SECTION_EXPANDED_OBJECT } from '../../Constants/DefaultProps';
import { testDispatchFunctions } from '../../testUtilities/testUtilities';
import ProfileMenu, { mapDispatchToProps } from './ProfileMenu';

describe('ProfileMenu', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <ProfileMenu.WrappedComponent
        profileMenuExpanded
        profileMenuSectionExpanded={PROFILE_MENU_SECTION_EXPANDED_OBJECT}
        onSetProfileMenuExpanded={() => {}}
        onSetProfileMenuSectionExpanded={() => {}}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can call the collapseMenu function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <ProfileMenu.WrappedComponent
        profileMenuExpanded
        profileMenuSectionExpanded={PROFILE_MENU_SECTION_EXPANDED_OBJECT}
        onSetProfileMenuExpanded={spy}
        onSetProfileMenuSectionExpanded={() => {}}
      />,
    );
    wrapper.instance().collapseMenu();
    sinon.assert.calledOnce(spy);
  });

  it('can call the expandMenu function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <ProfileMenu.WrappedComponent
        profileMenuExpanded
        profileMenuSectionExpanded={PROFILE_MENU_SECTION_EXPANDED_OBJECT}
        onSetProfileMenuExpanded={spy}
        onSetProfileMenuSectionExpanded={() => {}}
      />,
    );
    wrapper.instance().expandMenu();
    sinon.assert.calledOnce(spy);
  });
});

describe('mapDispatchToProps', () => {
  const config = {
    onSetProfileMenuExpanded: [true],
    onSetProfileMenuSectionExpanded: [{}],
  };
  testDispatchFunctions(mapDispatchToProps, config);
});
