import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { NavLink } from './NavLink'; // get unwrapped component

describe('NavLink', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <NavLink
        title="test"
        link="/results"
        location={{ pathname: '/results' }}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('is active when the link matches location pathname', () => {
    const wrapper = shallow(
      <NavLink
        title="test"
        link="/"
        location={{ pathname: '/' }}
      />,
    );
    expect(wrapper.find('.is-active').exists()).toBe(true);
    expect(wrapper.find('.is-not-active').exists()).toBe(false);
  });

  it('matches snapshot when the link matches location pathname', () => {
    const wrapper = shallow(
      <NavLink
        title="test"
        link="/"
        location={{ pathname: '/' }}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('is not active when the link matches location pathname', () => {
    const wrapper = shallow(
      <NavLink
        title="test"
        link="/"
        location={{ pathname: '/profile' }}
      />,
    );
    expect(wrapper.find('.is-active').exists()).toBe(false);
    expect(wrapper.find('.is-not-active').exists()).toBe(true);
  });

  it('matches snapshot when the link does not match location pathname', () => {
    const wrapper = shallow(
      <NavLink
        title="test"
        link="/"
        location={{ pathname: '/profile' }}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
