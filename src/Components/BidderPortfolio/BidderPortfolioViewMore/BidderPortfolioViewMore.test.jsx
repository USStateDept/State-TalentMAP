import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import BidderPortfolioViewMore from './BidderPortfolioViewMore';
import bidderListObject from '../../../__mocks__/bidderListObject';

describe('BidderPortfolioViewMoreComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<BidderPortfolioViewMore
      bidderPortfolio={bidderListObject}
      bidderPortfolioIsLoading={false}
      bidderPortfolioHasErrored={false}
      pageSize={8}
      queryParamUpdate={() => {}}
      pageNumber={1}
    />);
    expect(wrapper).toBeDefined();
  });

  it('accepts different props', () => {
    const wrapper = shallow(<BidderPortfolioViewMore
      bidderPortfolio={bidderListObject}
      bidderPortfolioIsLoading={false}
      bidderPortfolioHasErrored={false}
      pageSize={8}
      queryParamUpdate={() => {}}
      pageNumber={1}
      isExpanded
      useLink
    />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<BidderPortfolioViewMore
      bidderPortfolio={bidderListObject}
      bidderPortfolioIsLoading={false}
      bidderPortfolioHasErrored={false}
      pageSize={8}
      queryParamUpdate={() => {}}
      pageNumber={1}
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
