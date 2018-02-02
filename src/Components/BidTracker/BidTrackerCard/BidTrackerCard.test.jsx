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
    userProfile: bidderUserObject,
  };

  it('is defined', () => {
    const wrapper = shallow(
      <BidTrackerCard {...props} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <BidTrackerCard {...props} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
