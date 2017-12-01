import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import BidderPortfolioPage from './BidderPortfolioPage';
import bidderListObject from '../../../__mocks__/bidderListObject';
import bidderPortfolioCountsObject from '../../../__mocks__/bidderPortfolioCountsObject';

describe('BidderPortfolioPageComponent', () => {
  const props = {
    bidderPortfolio: bidderListObject,
    bidderPortfolioIsLoading: false,
    bidderPortfolioHasErrored: false,
    pageSize: 8,
    queryParamUpdate: () => {},
    pageNumber: 1,
    bidderPortfolioCounts: bidderPortfolioCountsObject,
  };

  it('is defined', () => {
    const wrapper = shallow(<BidderPortfolioPage {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('can set state by calling the changeViewType function', () => {
    const wrapper = shallow(<BidderPortfolioPage {...props} />);
    expect(wrapper.instance().state.viewType.value).toBe('card');
    wrapper.instance().changeViewType('grid');
    expect(wrapper.instance().state.viewType.value).toBe('grid');
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<BidderPortfolioPage {...props} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
