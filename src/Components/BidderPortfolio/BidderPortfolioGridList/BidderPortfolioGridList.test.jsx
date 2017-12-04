import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import BidderPortfolioGridList from './BidderPortfolioGridList';
import bidderListObject from '../../../__mocks__/bidderListObject';

describe('BidderPortfolioGridListComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<BidderPortfolioGridList
      results={bidderListObject.results}
    />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<BidderPortfolioGridList
      results={bidderListObject.results}
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
