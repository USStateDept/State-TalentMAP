import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import Navigation from './Navigation';
import bidderPortfolioCountsObject from '../../../../__mocks__/bidderPortfolioCountsObject';

describe('NavigationComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <Navigation
        counts={bidderPortfolioCountsObject}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <Navigation
        counts={bidderPortfolioCountsObject}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
