import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import SavedSearches from './SavedSearches';
import searchObjectParent from '../../__mocks__/searchObjectParent';

describe('SavedSearchesComponent', () => {
  const props = {
    savedSearches: searchObjectParent,
    savedSearchesIsLoading: false,
    savedSearchesHasErrored: false,
    goToSavedSearch: () => {},
    deleteSearch: () => {},
    filtersIsLoading: false,
    onSortChange: () => {},
    defaultSort: '',
  };

  it('is defined', () => {
    const wrapper = shallow(
      <SavedSearches
        {...props}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <SavedSearches
        {...props}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
