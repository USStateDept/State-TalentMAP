import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import BidTrackerCardBottom from './BidTrackerCardBottom';

describe('BidTrackerCardBottomComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <BidTrackerCardBottom />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <BidTrackerCardBottom />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
