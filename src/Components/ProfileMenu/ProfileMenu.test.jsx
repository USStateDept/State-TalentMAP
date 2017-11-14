import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import ProfileMenu from './ProfileMenu';

describe('ProfileMenuComponent', () => {
  const locationMock = {
    pathname: '/profile/favorites/',
  };
  it('is defined', () => {
    const wrapper = shallow(
      <ProfileMenu.WrappedComponent
        location={locationMock}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('it sets isHighlighted to correct values', () => {
    const wrapper = shallow(
      <ProfileMenu.WrappedComponent
        location={locationMock}
      />,
    );
    expect(wrapper.find('[title="Bid List"]').prop('isHighlighted')).toBe(false);
    // Favorites should be the only highlighted link
    expect(wrapper.find('[title="Favorites"]').prop('isHighlighted')).toBe(true);
    expect(wrapper.find('[title="Inbox"]').prop('isHighlighted')).toBe(false);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <ProfileMenu.WrappedComponent
        location={locationMock}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
