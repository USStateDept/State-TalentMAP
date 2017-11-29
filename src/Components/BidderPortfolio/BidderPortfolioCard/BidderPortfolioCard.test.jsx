import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import BidderPortfolioCard from './BidderPortfolioCard';
import { bidderUserObject } from '../../../__mocks__/userObject';

describe('BidderPortfolioCardComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<BidderPortfolioCard userProfile={bidderUserObject} />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<BidderPortfolioCard userProfile={bidderUserObject} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
