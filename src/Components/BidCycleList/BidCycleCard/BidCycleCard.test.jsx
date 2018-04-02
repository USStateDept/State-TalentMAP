import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import BidCycleCard from './BidCycleCard';
import mock from '../../../__mocks__/bidCycles';

describe('BidCycleCard Component', () => {
  const props = {
    props: mock[0],
  };

  it('is defined', () => {
    const wrapper = shallow(<BidCycleCard {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<BidCycleCard {...props} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
