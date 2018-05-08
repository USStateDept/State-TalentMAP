import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import SavedSearchesList from './SavedSearchesList';
import { searchObjectParent, mappedParams } from '../../../__mocks__/searchObject';

describe('SavedSearchesListComponent', () => {
  const props = {
    savedSearches: searchObjectParent,
    goToSavedSearch: () => {},
    mappedParams,
    filtersIsLoading: false,
  };
  it('is defined', () => {
    const wrapper = shallow(<SavedSearchesList {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<SavedSearchesList {...props} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when filtersIsLoading is true', () => {
    const wrapper = shallow(<SavedSearchesList {...props} filtersIsLoading />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when there are no saved searches', () => {
    const wrapper = shallow(<SavedSearchesList {...props} savedSearches={{ results: [] }} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
