import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import BidTrackerCardTitle from './BidTrackerCardTitle';
import { DRAFT_PROP, SUBMITTED_PROP } from '../../../Constants/BidData';
import bidStatistics from '../../../__mocks__/bidStatistics';
import postObject from '../../../__mocks__/postObject';

const props = {
  title: 'Title',
  id: 100,
  status: DRAFT_PROP,
  bidStatistics,
  post: postObject,
};

describe('BidTrackerCardTitleComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <BidTrackerCardTitle {...props} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('is defined when status is "submitted"', () => {
    const wrapper = shallow(
      <BidTrackerCardTitle {...props} status={SUBMITTED_PROP} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('it renders extra content when status is "submitted"', () => {
    const wrapper = shallow(
      <BidTrackerCardTitle {...props} status={SUBMITTED_PROP} />,
    );
    expect(wrapper.find('.bid-tracker-card-title-bottom').exists()).toBe(true);
  });

  it('it does not render extra content when status is not "submitted"', () => {
    const wrapper = shallow(
      <BidTrackerCardTitle {...props} status={DRAFT_PROP} />,
    );
    expect(wrapper.find('bid-tracker-card-title-bottom').exists()).toBe(false);
  });

  it('matches snapshot when status is not "submitted"', () => {
    const wrapper = shallow(
      <BidTrackerCardTitle {...props} status={DRAFT_PROP} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when status is "submitted"', () => {
    const wrapper = shallow(
      <BidTrackerCardTitle {...props} status={SUBMITTED_PROP} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
