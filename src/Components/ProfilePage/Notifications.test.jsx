import { shallow } from 'enzyme';
import React from 'react';
import Notifications from './Notifications';

describe('Notifications', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <Notifications />,
    );
    expect(wrapper).toBeDefined();
  });
});
