import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import BidCycle from './BidCycle';
import mock from '../../../__mocks__/bidCycles';

describe('BidCycleComponent', () => {
  const props = {
    props: mock[0],
  };

  it('is defined', () => {
    const wrapper = shallow(<BidCycle {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<BidCycle {...props} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
