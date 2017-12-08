import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import BidderPortfolioGridListHeaderItem from './BidderPortfolioGridListHeaderItem';

describe('BidderPortfolioGridListHeaderItemComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<BidderPortfolioGridListHeaderItem content="test" />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<BidderPortfolioGridListHeaderItem content="test" />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
