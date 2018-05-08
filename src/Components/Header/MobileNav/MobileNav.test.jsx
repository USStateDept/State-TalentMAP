import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import MobileNav from './MobileNav';
import { bidderUserObject } from '../../../__mocks__/userObject';

describe('MobileNav', () => {
  beforeEach(() => {
    process.env.PUBLIC_URL = '/talentmap/';
  });

  it('is defined', () => {
    const wrapper = shallow(
      <MobileNav
        user={bidderUserObject.user.username}
        logout={() => {}}
        showLogin
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot when showLogin is true', () => {
    const wrapper = shallow(
      <MobileNav
        user={bidderUserObject.user.username}
        logout={() => {}}
        showLogin
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when showLogin is false', () => {
    const wrapper = shallow(
      <MobileNav
        user={bidderUserObject.user.username}
        logout={() => {}}
        showLogin={false}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('displays login link if user is logged out', () => {
    const wrapper = shallow(
      <MobileNav
        user={bidderUserObject.user.username}
        logout={() => {}}
        showLogin
      />,
    );
    expect(wrapper.find('#login-mobile').exists()).toBe(true);
  });
});
