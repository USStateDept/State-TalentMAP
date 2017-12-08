import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import UserProfileBidInformation from './UserProfileBidInformation';

describe('UserProfileBidInformationComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<UserProfileBidInformation />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<UserProfileBidInformation />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
