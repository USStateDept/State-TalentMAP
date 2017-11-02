import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import NavLink from './NavLink';

describe('NavLinkComponent', () => {
  it('is defined with no children', () => {
    const wrapper = shallow(
      <NavLink
        title="test"
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('is defined with one child', () => {
    const wrapper = shallow(
      <NavLink
        title="test"
        currentPath="/profile/favorites/"
      >
        <NavLink
          title="test2"
          link="/profile/favorites/"
        />
      </NavLink>,
    );
    expect(wrapper).toBeDefined();
  });

  it('is defined with multiple children', () => {
    const wrapper = shallow(
      <NavLink
        title="test"
        currentPath="/profile/favorites/"
      >
        <NavLink
          title="test2"
          link="/profile/favorites/"
        />
        <NavLink
          title="test3"
          link="/profile/searches/"
        />
      </NavLink>,
    );
    expect(wrapper).toBeDefined();
  });

  it('can apply link-highlighted class when isHighlighted is true', () => {
    const wrapper = shallow(
      <NavLink
        title="test"
        currentPath="/profile/favorites/"
        link="/profile/favorites/"
        isHighlighted
      />,
    );
    // should exist
    expect(wrapper.find('.link-highlighted')).toHaveLength(1);
    // should not exist
    expect(wrapper.find('.link-unhighlighted')).toHaveLength(0);
  });

  it('can apply link-unhighlighted class when isHighlighted is false', () => {
    const wrapper = shallow(
      <NavLink
        title="test"
        currentPath="/profile/favorites/"
        link="/profile/favorites/"
        isHighlighted={false}
      />,
    );
    // should not exist
    expect(wrapper.find('.link-highlighted')).toHaveLength(0);
    // should exist
    expect(wrapper.find('.link-unhighlighted')).toHaveLength(1);
  });

  it('can expand and close a grouped list', () => {
    const wrapper = shallow(
      <NavLink
        title="test"
        currentPath="/profile/favorites/"
      >
        <NavLink
          title="test2"
          link="/profile/favorites/"
        />
        <NavLink
          title="test3"
          link="/profile/searches/"
        />
      </NavLink>,
    );
    // children should be rendered, since we have a child link that matches the current path
    expect(wrapper.find('.children-ul')).toHaveLength(1);
    // click the div
    wrapper.find('[role="link"]').simulate('click');
    // should change showNestedLinks.value to false
    expect(wrapper.instance().state.showNestedLinks.value).toBe(false);
    // children should disappear
    expect(wrapper.find('.children-ul')).toHaveLength(0);
    // click/enter again
    wrapper.find('[role="link"]').simulate('keyUp', { keyCode: 13 });
    // should change showNestedLinks.value to true
    expect(wrapper.instance().state.showNestedLinks.value).toBe(true);
    // children should re-appear
    expect(wrapper.find('.children-ul')).toHaveLength(1);
  });

  it('matches snapshot without children', () => {
    const wrapper = shallow(
      <NavLink
        title="test"
        currentPath="/profile/favorites/"
        link="/profile/favorites/"
        isHighlighted
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
