import React from 'react';
import { shallow } from 'enzyme';
import DarkMode from './DarkMode';

describe('DarkMode', () => {
  const props = {
    isDarkMode: true,
  };

  it('is defined', () => {
    const wrapper = shallow(
      <DarkMode.WrappedComponent {...props} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('is defined after it receives new props', () => {
    const wrapper = shallow(
      <DarkMode.WrappedComponent {...props} />,
    );
    wrapper.setProps({ isDarkMode: false });
    wrapper.update();
    expect(wrapper).toBeDefined();
  });
});
