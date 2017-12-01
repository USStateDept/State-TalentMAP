import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import NavigationList from './NavigationList';
import bidderPortfolioCountsObject from '../../../../../__mocks__/bidderPortfolioCountsObject';

describe('NavigationListComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <NavigationList
        counts={bidderPortfolioCountsObject}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <NavigationList
        counts={bidderPortfolioCountsObject}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
