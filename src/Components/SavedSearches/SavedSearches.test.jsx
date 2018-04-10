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
    deleteSavedSearchIsLoading: false,
    deleteSavedSearchHasErrored: false,
    deleteSavedSearchSuccess: false,
    cloneSavedSearchIsLoading: false,
    cloneSavedSearchHasErrored: false,
    cloneSavedSearchSuccess: false,
    cloneSavedSearch: () => {},
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

  it('can receive props', () => {
    const wrapper = shallow(
      <SavedSearches
        {...props}
      />,
    );
    expect(wrapper.instance().props.savedSearches.results[0].id)
      .toBe(searchObjectParent.results[0].id);
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
