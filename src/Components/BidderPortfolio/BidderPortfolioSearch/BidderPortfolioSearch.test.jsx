import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import BidderPortfolioSearch from './BidderPortfolioSearch';

describe('BidderPortfolioSearchComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <BidderPortfolioSearch
        onUpdate={() => {}}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <BidderPortfolioSearch
        onUpdate={() => {}}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
