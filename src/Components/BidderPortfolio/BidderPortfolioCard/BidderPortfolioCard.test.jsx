import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import BidderPortfolioCard from './BidderPortfolioCard';
import { bidderUserObject } from '../../../__mocks__/userObject';

describe('BidderPortfolioCardComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<BidderPortfolioCard userProfile={bidderUserObject} />);
    expect(wrapper).toBeDefined();
  });

  it('renders 0 if bid_statistics is undefined', () => {
    const newProfile = { ...bidderUserObject };
    newProfile.bid_statistics = [null];
    const wrapper = shallow(<BidderPortfolioCard userProfile={newProfile} />);
    expect(wrapper.find('UserProfileBidInformation').props().draft).toBe(0);
    expect(wrapper.find('UserProfileBidInformation').props().submitted).toBe(0);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<BidderPortfolioCard userProfile={bidderUserObject} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
