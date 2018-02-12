import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import TopNav from './TopNav';
import bidderPortfolioCountsObject from '../../../__mocks__/bidderPortfolioCountsObject';

describe('TopNavComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <TopNav
        onUpdate={() => {}}
        bidderPortfolioCounts={bidderPortfolioCountsObject}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <TopNav
        onUpdate={() => {}}
        bidderPortfolioCounts={bidderPortfolioCountsObject}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
