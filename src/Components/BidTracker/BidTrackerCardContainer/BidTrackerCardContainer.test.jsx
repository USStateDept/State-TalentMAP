import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import BidTrackerCardContainer from './BidTrackerCardContainer';
import bidListObject from '../../../__mocks__/bidListObject';

describe('BidTrackerCardContainerComponent', () => {
  const bid = bidListObject.results[0];

  const props = {
    bid,
    acceptBid: () => {},
    declineBid: () => {},
    isPriority: false,
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

  it('matches snapshot when priorityExists is true and isPriority is true', () => {
    const wrapper = shallow(
      <BidTrackerCardContainer {...props} priorityExists isPriority />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when priorityExists is true and isPriority is false', () => {
    const wrapper = shallow(
      <BidTrackerCardContainer {...props} priorityExists isPriority={false} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
