import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import SavedSearchesWrapper from './SavedSearchesWrapper';

describe('SavedSearchesWrapper', () => {
  it('is defined', () => {
    const wrapper = shallow(<SavedSearchesWrapper />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<SavedSearchesWrapper />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
