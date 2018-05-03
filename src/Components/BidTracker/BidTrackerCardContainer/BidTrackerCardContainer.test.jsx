import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import BidTrackerCardContainer from './BidTrackerCardContainer';
import bidListObject from '../../../__mocks__/bidListObject';
import { bidderUserObject } from '../../../__mocks__/userObject';

describe('BidTrackerCardContainerComponent', () => {
  const bid = bidListObject.results[0];

  const props = {
    bid,
    acceptBid: () => {},
    declineBid: () => {},
    submitBid: () => {},
    deleteBid: () => {},
    isPriority: false,
    userProfile: bidderUserObject,
  };

  it('is defined', () => {
    const wrapper = shallow(
      <BidTrackerCardContainer {...props} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot when priorityExists is false', () => {
    const wrapper = shallow(
      <BidTrackerCardContainer {...props} priorityExists={false} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when priorityExists is true and bid.is_priority is true', () => {
    const wrapper = shallow(
      <BidTrackerCardContainer {...props} priorityExists bid={{ ...bid, is_priority: true }} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when priorityExists is true and bid.is_priority is false', () => {
    const wrapper = shallow(
      <BidTrackerCardContainer {...props} priorityExists bid={{ ...bid, is_priority: false }} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
