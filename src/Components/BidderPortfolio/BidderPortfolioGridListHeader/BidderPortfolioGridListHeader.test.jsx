import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import BidderPortfolioGridListHeader from './BidderPortfolioGridListHeader';

describe('BidderPortfolioGridListHeaderComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<BidderPortfolioGridListHeader />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<BidderPortfolioGridListHeader />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
