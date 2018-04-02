import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import BidCycles from './BidCycles';
import mock from '../../__mocks__/bidCycles';

describe('BidCyclesComponent', () => {
  const props = {
    cycles: mock,
  };

  it('is defined', () => {
    const wrapper = shallow(<BidCycles {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<BidCycles {...props} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
