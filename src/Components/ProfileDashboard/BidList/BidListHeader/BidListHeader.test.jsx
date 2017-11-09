import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import BidListHeader from './BidListHeader';

describe('BidListHeaderComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<BidListHeader />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<BidListHeader />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
