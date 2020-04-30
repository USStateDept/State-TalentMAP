import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import { APPROVED_PROP, DRAFT_PROP, SUBMITTED_PROP } from 'Constants/BidData';
import BidTrackerCardTitle from './BidTrackerCardTitle';
import bidStatistics from '../../../__mocks__/bidStatistics';
import postObject from '../../../__mocks__/postObject';

const props = {
  title: 'Title',
  positionNumber: '12345',
  id: 100,
  status: DRAFT_PROP,
  bidStatistics,
  post: postObject,
  bidCycle: 'Summer 2020',
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

  it('is defined when status is "approved" and context values are true', () => {
    const wrapper = shallow(
      <BidTrackerCardTitle {...props} status={APPROVED_PROP} />,
      { context: { condensedView: true, priorityExists: true, isPriority: true } },
    );
    expect(wrapper).toBeDefined();
  });

  it('is defined when status is not "approved" and context values are true', () => {
    const wrapper = shallow(
      <BidTrackerCardTitle {...props} status={SUBMITTED_PROP} />,
      { context: { condensedView: true, priorityExists: true, isPriority: true } },
    );
    expect(wrapper).toBeDefined();
  });

  it('is defined when condensedView && priorityExists && !isPriority', () => {
    const wrapper = shallow(
      <BidTrackerCardTitle {...props} status={SUBMITTED_PROP} />,
      { context: { condensedView: true, priorityExists: true, isPriority: false } },
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

  it('displays the title correctly if positionNumber is not truthy', () => {
    const wrapper = shallow(
      <BidTrackerCardTitle {...props} positionNumber={undefined} />,
    );
    expect(wrapper.find('.bid-tracker-card-title-text').text()).toBe('Title');
  });

  it('displays the title correctly if positionNumber is truthy', () => {
    const wrapper = shallow(
      <BidTrackerCardTitle {...props} />,
    );
    expect(wrapper.find('.bid-tracker-card-title-text').text()).toBe('Title (12345)');
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

  it('matches snapshot when status is "approved" and priorityExists and isPriority', () => {
    const wrapper = shallow(
      <BidTrackerCardTitle {...props} status={APPROVED_PROP} priorityExists isPriority />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when status is "submitted" and priorityExists and isPriority', () => {
    const wrapper = shallow(
      <BidTrackerCardTitle {...props} status={SUBMITTED_PROP} priorityExists isPriority />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when condensedView is true, priorityExists is true, and isPriority is false', () => {
    const wrapper = shallow(
      <BidTrackerCardTitle {...props} status={APPROVED_PROP} priorityExists isPriority={false} />,
      { condensedView: true });
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
