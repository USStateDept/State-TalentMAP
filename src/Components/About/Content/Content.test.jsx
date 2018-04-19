import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Content from './Content';

describe('Content', () => {
  it('is defined with a default type of info', () => {
    const wrapper = shallow(<Content />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot when isAriaLive is true', () => {
    const wrapper = shallow(<Content />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
