import { shallow } from 'enzyme';
import React from 'react';
import Logout from './Logout';

describe('Logout', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <Logout />,
    );
    expect(wrapper).toBeDefined();
  });
});
