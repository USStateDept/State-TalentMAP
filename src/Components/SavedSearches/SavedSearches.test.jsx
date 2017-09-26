import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import SavedSearches from './SavedSearches';
import searchObjectParent from '../../__mocks__/searchObjectParent';

describe('SavedSearchesComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <SavedSearches
        savedSearches={searchObjectParent}
        savedSearchesIsLoading={false}
        savedSearchesHasErrored={false}
        goToSavedSearch={() => {}}
        deleteSearch={() => {}}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can receive props', () => {
    const wrapper = shallow(
      <SavedSearches
        savedSearches={searchObjectParent}
        savedSearchesIsLoading
        savedSearchesHasErrored={false}
        goToSavedSearch={() => {}}
        deleteSearch={() => {}}
      />,
    );
    expect(wrapper.instance().props.savedSearches.results[0].id)
      .toBe(searchObjectParent.results[0].id);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <SavedSearches
        savedSearches={searchObjectParent}
        savedSearchesIsLoading={false}
        savedSearchesHasErrored={false}
        goToSavedSearch={() => {}}
        deleteSearch={() => {}}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
