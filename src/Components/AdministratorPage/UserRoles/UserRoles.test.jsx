import React from 'react';
import { shallow } from 'enzyme';
import UserRoles from './UserRoles';

describe('UserRoles', () => {
  it('is defined', () => {
    const wrapper = shallow(<UserRoles.WrappedComponent />);
    expect(wrapper).toBeDefined();
  });
});
