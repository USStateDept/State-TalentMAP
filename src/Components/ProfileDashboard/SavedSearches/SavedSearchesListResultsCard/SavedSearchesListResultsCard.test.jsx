import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import SavedSearchesListResultsCard from './SavedSearchesListResultsCard';
import { searchObject, mappedParams } from '../../../../__mocks__/searchObject';

describe('SavedSearchesListResultsCardComponent', () => {
  const props = {
    mappedParams,
    savedSearch: searchObject,
    goToSavedSearch: () => {},
  };
  it('is defined', () => {
    const wrapper = shallow(
      <SavedSearchesListResultsCard
        {...props}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can receive props', () => {
    const wrapper = shallow(
      <SavedSearchesListResultsCard
        {...props}
      />,
    );
    expect(wrapper.instance().props.savedSearch.id).toBe(searchObject.id);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <SavedSearchesListResultsCard
        {...props}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
