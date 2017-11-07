import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import BidList from './BidList';

describe('BidListComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<BidList />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot when editor is shown', () => {
    const wrapper = shallow(<BidList />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
