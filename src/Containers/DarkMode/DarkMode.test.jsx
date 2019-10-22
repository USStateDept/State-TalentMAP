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
});
