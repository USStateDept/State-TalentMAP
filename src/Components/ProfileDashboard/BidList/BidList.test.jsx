import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import BidList from './BidList';
import bidListObject from '../../../__mocks__/bidListObject';

describe('BidListComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<BidList bids={bidListObject.results} />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<BidList bids={bidListObject.results} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
