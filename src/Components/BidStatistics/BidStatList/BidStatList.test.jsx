import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import BidStatList from './BidStatList';
import bidStatistics from '../../../__mocks__/bidStatistics';

describe('BidStatListComponent', () => {
  const props = {
    bidStats: bidStatistics,
  };
  it('is defined', () => {
    const wrapper = shallow(
      <BidStatList
        {...props}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <BidStatList
        {...props}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
