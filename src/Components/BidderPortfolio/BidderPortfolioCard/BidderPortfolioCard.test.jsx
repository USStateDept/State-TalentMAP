import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import BidderPortfolioCard from './BidderPortfolioCard';
import userObject from '../../../__mocks__/userObject';

describe('BidderPortfolioCardComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<BidderPortfolioCard userProfile={userObject} />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<BidderPortfolioCard userProfile={userObject} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
