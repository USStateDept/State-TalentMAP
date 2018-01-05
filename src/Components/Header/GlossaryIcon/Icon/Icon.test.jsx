import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Icon from './Icon';

describe('IconComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <Icon onClick={() => {}} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <Icon onClick={() => {}} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
