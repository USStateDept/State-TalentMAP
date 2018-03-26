import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import SavedSearchesList from './SavedSearchesList';
import searchObjectParent from '../../../__mocks__/searchObjectParent';

describe('SavedSearchesListComponent', () => {
  const props = {
    savedSearches: searchObjectParent,
    goToSavedSearch: () => {},
    deleteSavedSearch: () => {},
    deleteSearch: () => {},
    cloneSavedSearch: () => {},
    mappedParams: [],
  };
  it('is defined', () => {
    const wrapper = shallow(
      <SavedSearchesList
        {...props}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can receive props', () => {
    const wrapper = shallow(
      <SavedSearchesList
        {...props}
      />,
    );
    expect(wrapper.instance().props.savedSearches.results[0].id)
      .toBe(searchObjectParent.results[0].id);
  });

  it('displays an alert if there are no results', () => {
    const wrapper = shallow(
      <SavedSearchesList
        {...props}
        savedSearches={{ results: [] }}
      />,
    );
    expect(wrapper.find('NoSavedSearches').exists()).toBe(true);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <SavedSearchesList
        {...props}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
