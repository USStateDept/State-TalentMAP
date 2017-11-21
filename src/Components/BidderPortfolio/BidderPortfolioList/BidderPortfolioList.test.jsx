import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import BidderPortfolioList from './BidderPortfolioList';
import bidderListObject from '../../../__mocks__/bidderListObject';

describe('BidderPortfolioListComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<BidderPortfolioList
      results={bidderListObject.results}
    />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<BidderPortfolioList
      results={bidderListObject.results}
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
