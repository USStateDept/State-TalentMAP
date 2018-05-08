import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import BidTrackerCardTop from './BidTrackerCardTop';
import bidListObject from '../../../__mocks__/bidListObject';

describe('BidTrackerCardTopComponent', () => {
  const bid = bidListObject.results[0];

  const props = {
    bid,
  };

  it('is defined', () => {
    const wrapper = shallow(
      <BidTrackerCardTop {...props} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('is defined with an invalid bid status', () => {
    const newBid = { ...props.bid };
    newBid.status = 'fake status';
    const wrapper = shallow(
      <BidTrackerCardTop {...props} bid={newBid} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <BidTrackerCardTop {...props} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
