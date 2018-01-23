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

  it('can set expanded state to true with the expandSection function', () => {
    const wrapper = shallow(<BidderPortfolioGridItem userProfile={bidderUserObject} />);
    wrapper.instance().expandSection();
    expect(wrapper.instance().state.expanded.value).toBe(true);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<BidderPortfolioGridItem userProfile={bidderUserObject} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
