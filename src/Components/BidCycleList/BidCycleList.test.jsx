import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import BidCycleList from './BidCycleList';
import mock from '../../__mocks__/bidCycles';

describe('BidCycleList Component', () => {
  const props = {
    cycles: mock,
  };

  it('is defined', () => {
    const wrapper = shallow(<BidCycleList {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<BidCycleList {...props} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
