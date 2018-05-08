import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import DesktopNav from './DesktopNav';
import { bidderUserObject } from '../../../__mocks__/userObject';

describe('DesktopNav', () => {
  beforeEach(() => {
    process.env.PUBLIC_URL = '/talentmap/';
  });

  it('is defined', () => {
    const wrapper = shallow(
      <DesktopNav
        isLoggedIn
        shouldShowSearchBar
        userProfile={bidderUserObject}
        logout={() => {}}
        toggleSearchVisibility={() => {}}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot when logged in', () => {
    const wrapper = shallow(
      <DesktopNav
        isLoggedIn
        shouldShowSearchBar
        userProfile={bidderUserObject}
        logout={() => {}}
        toggleSearchVisibility={() => {}}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when logged out', () => {
    const wrapper = shallow(
      <DesktopNav
        isLoggedIn={false}
        shouldShowSearchBar
        userProfile={bidderUserObject}
        logout={() => {}}
        toggleSearchVisibility={() => {}}
      />,
      );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
