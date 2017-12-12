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

  it('is bold when the link matches location pathname', () => {
    const wrapper = shallow(
      <NavLink
        title="test"
        link="/"
        location={{ pathname: '/' }}
      />,
    );
    expect(wrapper.find('.is-bolded').exists()).toBe(true);
    expect(wrapper.find('.is-not-bolded').exists()).toBe(false);
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

  it('is not bold when the link matches location pathname', () => {
    const wrapper = shallow(
      <NavLink
        title="test"
        link="/"
        location={{ pathname: '/profile' }}
      />,
    );
    expect(wrapper.find('.is-bolded').exists()).toBe(false);
    expect(wrapper.find('.is-not-bolded').exists()).toBe(true);
  });

  it('matches snapshot when the link does not matche location pathname', () => {
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
