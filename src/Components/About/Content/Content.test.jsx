import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Content from './Content';

describe('Content', () => {
  it('is defined', () => {
    const wrapper = shallow(<Content />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<Content />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
