import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import { NavLinkUnwrapped } from './NavLink';

describe('NavLinkComponent', () => {
  const locationMock = {
    pathname: '/profile/favorites/',
  };
  it('is defined with no children', () => {
    const wrapper = shallow(
      <NavLinkUnwrapped
        title="test"
        location={locationMock}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('is defined with one child', () => {
    const wrapper = shallow(
      <NavLinkUnwrapped
        title="test"
        location={locationMock}
      >
        <NavLinkUnwrapped
          title="test2"
          link="/profile/favorites/"
          location={locationMock}
        />
      </NavLinkUnwrapped>,
    );
    expect(wrapper).toBeDefined();
  });

  it('is defined with multiple children', () => {
    const wrapper = shallow(
      <NavLinkUnwrapped
        title="test"
        location={locationMock}
      >
        <NavLinkUnwrapped
          title="test2"
          link="/profile/favorites/"
          location={locationMock}
        />
        <NavLinkUnwrapped
          title="test3"
          link="/profile/searches/"
          location={locationMock}
        />
      </NavLinkUnwrapped>,
    );
    expect(wrapper).toBeDefined();
  });

  it('applies link-highlighted class when isHighlighted is true', () => {
    const wrapper = shallow(
      <NavLinkUnwrapped
        title="test"
        location={locationMock}
        link="/profile/favorites/"
      />,
    );
    // should exist
    expect(wrapper.find('.link-highlighted')).toHaveLength(1);
    // should not exist
    expect(wrapper.find('.link-unhighlighted')).toHaveLength(0);
  });

  it('applies link-unhighlighted class when isHighlighted is false', () => {
    const wrapper = shallow(
      <NavLinkUnwrapped
        title="test"
        location={locationMock}
        link="/profile/bidlist/"
      />,
    );
    // should not exist
    expect(wrapper.find('.link-highlighted')).toHaveLength(0);
    // should exist
    expect(wrapper.find('.link-unhighlighted')).toHaveLength(1);
  });

  // We can't use ".WrappedComponent" here because of nested elements,
  // so we use the Unwrapped import of the component.
  it('can expand and close a grouped list', () => {
    const wrapper = shallow(
      <NavLinkUnwrapped
        title="test"
        location={locationMock}
      >
        <NavLinkUnwrapped
          title="test2"
          link="/profile/favorites/"
          location={locationMock}
        />
        <NavLinkUnwrapped
          title="test3"
          link="/profile/searches/"
          location={locationMock}
        />
      </NavLinkUnwrapped>,
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
    wrapper.find('[role="link"]').simulate('click', { keyCode: 13 });
    // should change showNestedLinks.value to true
    expect(wrapper.instance().state.showNestedLinks.value).toBe(true);
    // children should re-appear
    expect(wrapper.find('.children-ul')).toHaveLength(1);
  });

  it('matches snapshot without children', () => {
    const wrapper = shallow(
      <NavLinkUnwrapped
        title="test"
        location={locationMock}
        link="/profile/favorites/"
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
