import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import BidderPortfolioGridItem from './BidderPortfolioGridItem';
import { bidderUserObject } from '../../../__mocks__/userObject';

describe('BidderPortfolioGridItemComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<BidderPortfolioGridItem userProfile={bidderUserObject} />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<BidderPortfolioGridItem userProfile={bidderUserObject} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
