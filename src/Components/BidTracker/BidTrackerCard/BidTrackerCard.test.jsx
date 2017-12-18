import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import BidTrackerCard from './BidTrackerCard';
import bidListObject from '../../../__mocks__/bidListObject';

describe('BidTrackerCardComponent', () => {
  const bid = bidListObject.results[0];

  it('is defined', () => {
    const wrapper = shallow(
      <BidTrackerCard bid={bid} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <BidTrackerCard bid={bid} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
