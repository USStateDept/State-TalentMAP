import React from 'react';
import { shallow } from 'enzyme';

import Login from './index';

describe('Login', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <Login />,
    );
    expect(wrapper).toBeDefined();
  });
});
