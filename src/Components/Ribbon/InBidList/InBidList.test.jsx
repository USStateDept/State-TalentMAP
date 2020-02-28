import { shallow } from 'enzyme';
import React from 'react';
import InBidList from './InBidList';

describe('InBidListComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<InBidList />);
    expect(wrapper).toBeDefined();
  });
});
