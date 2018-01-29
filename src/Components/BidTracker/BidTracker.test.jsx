import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import BidTracker from './BidTracker';
import bidListObject from '../../__mocks__/bidListObject';
import notificationsObject from '../../__mocks__/notificationsObject';
import { bidderUserObject } from '../../__mocks__/userObject';

describe('BidTrackerComponent', () => {
  const props = {
    bidList: bidListObject,
    bidListIsLoading: false,
    acceptBid: () => {},
    declineBid: () => {},
    submitBid: () => {},
    deleteBid: () => {},
    notifications: notificationsObject,
    notificationsIsLoading: false,
    markBidTrackerNotification: () => {},
    userProfile: bidderUserObject,
    userProfileIsLoading: false,
  };

  it('is defined', () => {
    const wrapper = shallow(
      <BidTracker {...props} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <BidTracker {...props} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when bidListIsLoading is true', () => {
    const wrapper = shallow(
      <BidTracker {...props} bidListIsLoading />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
