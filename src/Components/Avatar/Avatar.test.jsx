import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Avatar from './Avatar';

describe('Avatar', () => {
  const props = {
    initials: 'JD',
    firstName: 'John',
    lastName: 'Doe',
    className: 'special-class',
  };

  it('is defined', () => {
    const wrapper = shallow(<Avatar {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('contains attributes for accessibility', () => {
    const wrapper = shallow(<Avatar {...props} />);
    const caption = `${props.firstName} ${props.lastName}`;

    expect(wrapper.prop('role')).toBe('img');
    expect(wrapper.prop('aria-label')).toBe(caption);
  });

  it('can pass an optional className prop', () => {
    const wrapper = shallow(<Avatar {...props} />);
    expect(wrapper.find(`.${props.className}`).exists()).toBe(true);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<Avatar {...props} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
