import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import { NavigationItem } from './NavigationItem';

describe('NavigationItemComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <NavigationItem
        title="test"
        numerator={5}
        denominator={10}
        link="?type=all"
        location={{ search: '?type=all' }}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('renders the is-underlined class when link matches location.search', () => {
    const wrapper = shallow(
      <NavigationItem
        title="test"
        numerator={5}
        denominator={10}
        link="?type=all"
        location={{ search: '?type=all' }}
      />,
    );
    expect(wrapper.find('.is-underlined').exists()).toBe(true);
    expect(wrapper.find('.is-not-underlined').exists()).toBe(false);
  });

  it('renders the is-not-underlined class when link matches location.search', () => {
    const wrapper = shallow(
      <NavigationItem
        title="test"
        numerator={5}
        denominator={10}
        link="?type=other"
        location={{ search: '?type=all' }}
      />,
    );
    expect(wrapper.find('.is-not-underlined').exists()).toBe(true);
    expect(wrapper.find('.is-underlined').exists()).toBe(false);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <NavigationItem
        title="test"
        numerator={5}
        denominator={10}
        link="?type=all"
        location={{ search: '?type=all' }}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
