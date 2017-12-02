import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import BidderPortfolioCardList from './BidderPortfolioCardList';
import bidderListObject from '../../../__mocks__/bidderListObject';

describe('BidderPortfolioCardListComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<BidderPortfolioCardList
      results={bidderListObject.results}
    />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<BidderPortfolioCardList
      results={bidderListObject.results}
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
