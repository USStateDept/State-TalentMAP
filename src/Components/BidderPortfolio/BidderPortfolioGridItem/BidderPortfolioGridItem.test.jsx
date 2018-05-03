import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import BidderPortfolioGridItem from './BidderPortfolioGridItem';
import { bidderUserObject } from '../../../__mocks__/userObject';

describe('BidderPortfolioGridItemComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<BidderPortfolioGridItem userProfile={bidderUserObject} />);
    expect(wrapper).toBeDefined();
  });

  it('is defined when bid_statistics is undefined', () => {
    const newProfile = { ...bidderUserObject };
    bidderUserObject.bid_statistics = [];
    const wrapper = shallow(<BidderPortfolioGridItem userProfile={newProfile} />);
    expect(wrapper).toBeDefined();
  });

  it('can set expanded state to true and then false with the expandSection function', () => {
    const wrapper = shallow(<BidderPortfolioGridItem userProfile={bidderUserObject} />);
    // should start out as false
    expect(wrapper.instance().state.expanded).toBe(false);
    wrapper.instance().expandSection();
    // should change to true
    expect(wrapper.instance().state.expanded).toBe(true);
    wrapper.instance().expandSection();
    // should change back to false
    expect(wrapper.instance().state.expanded).toBe(false);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<BidderPortfolioGridItem userProfile={bidderUserObject} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
