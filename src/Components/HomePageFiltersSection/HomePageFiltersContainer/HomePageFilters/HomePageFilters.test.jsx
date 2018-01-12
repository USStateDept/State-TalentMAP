import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import HomePageFilters from './HomePageFilters';
import filters from '../../../../__mocks__/filtersArray';

describe('HomePageFiltersComponent', () => {
  const props = {
    filters,
    submitSearch: () => {},
    onFilterSelect: () => {},
  };

  it('is defined', () => {
    const wrapper = shallow(
      <HomePageFilters {...props} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('is defined when no filters are available', () => {
    const wrapper = shallow(
      <HomePageFilters {...props} filters={[]} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('is defined when no filters are available and isLoading is true', () => {
    const wrapper = shallow(
      <HomePageFilters {...props} filters={[]} isLoading />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <HomePageFilters {...props} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
