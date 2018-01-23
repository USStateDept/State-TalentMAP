import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import BidStatistics from './BidStatistics';
import bidStatistics from '../../__mocks__/bidStatistics';

describe('BidStatisticsComponent', () => {
  const props = {
    bidStats: bidStatistics,
  };
  it('is defined', () => {
    const wrapper = shallow(
      <BidStatistics
        {...props}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <BidStatistics
        {...props}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
