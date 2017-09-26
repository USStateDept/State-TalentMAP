import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import SavedSearchesList from './SavedSearchesList';
import searchObjectParent from '../../__mocks__/searchObjectParent';

describe('SavedSearchesListComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <SavedSearchesList
        savedSearches={searchObjectParent}
        goToSavedSearch={() => {}}
        deleteSavedSearch={() => {}}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can receive props', () => {
    const wrapper = shallow(
      <SavedSearchesList
        savedSearches={searchObjectParent}
        goToSavedSearch={() => {}}
        deleteSavedSearch={() => {}}
      />,
    );
    expect(wrapper.instance().props.savedSearches.results[0].id)
      .toBe(searchObjectParent.results[0].id);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <SavedSearchesList
        savedSearches={searchObjectParent}
        goToSavedSearch={() => {}}
        deleteSavedSearch={() => {}}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
