import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import NoSavedSearches from './NoSavedSearches';

describe('NoSavedSearchesComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<NoSavedSearches />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<NoSavedSearches />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
