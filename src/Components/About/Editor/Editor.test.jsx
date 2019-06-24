import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Editor from './Editor';

describe('About', () => {
  it('is defined', () => {
    const wrapper = shallow(<Editor />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<Editor />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
