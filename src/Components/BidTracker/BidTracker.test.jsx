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
    registerHandshake: () => {},
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

  it('displays an alert when bidListIsLoading is false and bidList.results.length === 0', () => {
    const wrapper = shallow(
      <BidTracker {...props} bidListIsLoading={false} bidList={{ results: [] }} />,
    );
    expect(wrapper.find('Alert').exists()).toBe(true);
    expect(wrapper.find('Alert').props().title).toBe('Bid list empty');
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
