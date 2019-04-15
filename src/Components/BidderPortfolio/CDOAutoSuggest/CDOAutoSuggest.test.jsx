import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import CDOAutoSuggest from './CDOAutoSuggest';

describe('CDOAutoSuggest', () => {
  it('is defined', () => {
    const wrapper = shallow(<CDOAutoSuggest />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<CDOAutoSuggest />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot after toggling', () => {
    const wrapper = shallow(<CDOAutoSuggest />);
    wrapper.find('InteractiveElement').simulate('click');
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
