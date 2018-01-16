import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import HomePageFiltersSection from './HomePageFiltersSection';
import filters from '../../__mocks__/filtersArray';

describe('HomePageFiltersSectionComponent', () => {
  const props = {
    filters,
  };

  it('is defined', () => {
    const wrapper = shallow(
      <HomePageFiltersSection {...props} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <HomePageFiltersSection {...props} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
