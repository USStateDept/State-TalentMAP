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

  it('matches snapshot', () => {
    const wrapper = shallow(
      <BidTrackerCardTop {...props} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
