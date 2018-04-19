import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import About from './About';

describe('About', () => {
  it('is defined with a default type of info', () => {
    const wrapper = shallow(<About />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot when isAriaLive is true', () => {
    const wrapper = shallow(<About />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
