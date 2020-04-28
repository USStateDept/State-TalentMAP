import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import BidTrackerCard from './BidTrackerCard';
import bidListObject from '../../../__mocks__/bidListObject';
import { bidderUserObject } from '../../../__mocks__/userObject';

describe('BidTrackerCardComponent', () => {
  const bid = bidListObject.results[0];

  const props = {
    bid,
    acceptBid: () => {},
    declineBid: () => {},
    submitBid: () => {},
    deleteBid: () => {},
    registerHandshake: () => {},
    userProfile: bidderUserObject,
  };

  it('is defined', () => {
    const wrapper = shallow(
      <BidTrackerCard {...props} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('draft bid has draft class', () => {
    const newProps = { ...props };
    newProps.bid.status = 'draft';
    const wrapper = shallow(
      <BidTrackerCard {...newProps} />,
    );
    expect(wrapper).toBeDefined();
    expect(wrapper.find('bid-tracker-bid-steps-container--draft')).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <BidTrackerCard {...props} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
