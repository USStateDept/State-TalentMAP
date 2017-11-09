import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import ProfilePicture from './ProfilePicture';

describe('ProfilePicture', () => {
  it('is defined', () => {
    const wrapper = shallow(<ProfilePicture />);
    expect(wrapper).toBeDefined();
  });

  it('can accept an alt tag', () => {
    const alt = 'alt text';
    const wrapper = shallow(<ProfilePicture alt={alt} />);
    expect(wrapper.find('img').prop('alt')).toBe(alt);
    expect(wrapper).toBeDefined();
  });

  it('can pass an optional className prop', () => {
    const className = 'special-class';
    const wrapper = shallow(<ProfilePicture className={className} />);
    expect(wrapper.find(`.${className}`).exists()).toBe(true);
  });

  it('can accept the inverse prop', () => {
    const wrapper = shallow(<ProfilePicture inverse />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
