import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import ViewMoreLink from './ViewMoreLink';

describe('ViewMoreLink', () => {
  const props = {
    defaultValue: false,
    onChange: () => {},
  };

  it('is defined', () => {
    const wrapper = shallow(
      <ViewMoreLink {...props} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('toggles text on click', () => {
    const wrapper = shallow(
      <ViewMoreLink {...props} />,
    );
    expect(wrapper.instance().state.shouldDisplayViewMore).toBe(false);
    expect(wrapper.find('InteractiveElement').render().text()).toBe('View less');
    wrapper.find('InteractiveElement').simulate('click');
    expect(wrapper.instance().state.shouldDisplayViewMore).toBe(true);
    expect(wrapper.find('InteractiveElement').render().text()).toBe('View more');
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <ViewMoreLink {...props} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
