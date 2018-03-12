import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import BidListComingSoon from './BidListComingSoon';

describe('BidListComingSoonComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<BidListComingSoon />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<BidListComingSoon />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
