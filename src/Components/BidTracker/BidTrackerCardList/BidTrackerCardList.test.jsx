import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import BidTrackerCardList from './BidTrackerCardList';
import bidListObject from '../../../__mocks__/bidListObject';
import { bidderUserObject } from '../../../__mocks__/userObject';

describe('BidTrackerCardListComponent', () => {
  const bids = bidListObject.results;

  const props = {
    bids,
    acceptBid: () => {},
    declineBid: () => {},
    submitBid: () => {},
    deleteBid: () => {},
    userProfile: bidderUserObject,
  };

  it('is defined', () => {
    const wrapper = shallow(
      <BidTrackerCardList {...props} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('pushes the priority bid to the top', () => {
    // set all is_priority to false
    const bidList = bids.map(bid => ({ ...bid, is_priority: false }));
    // then make the second object is_priority so that we can test that it gets pushed to the top
    bidList[1].is_priority = true;
    const wrapper = shallow(
      <BidTrackerCardList {...props} bids={bidList} />,
    );
    expect(wrapper.find('BidTrackerCardContainer').at(0).props('bid').bid.is_priority).toBe(true);
    expect(wrapper.find('BidTrackerCardContainer').at(1).props('bid').bid.is_priority).toBe(false);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <BidTrackerCardList {...props} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
