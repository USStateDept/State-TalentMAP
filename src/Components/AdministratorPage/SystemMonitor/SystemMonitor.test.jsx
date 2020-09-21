import React from 'react';
import { shallow } from 'enzyme';
import UserRoles from './SystemMonitor';

describe('UserRoles', () => {
  const props = {
  };

  it('is defined', () => {
    const wrapper = shallow(<UserRoles.WrappedComponent {...props} />);
    expect(wrapper).toBeDefined();
  });
});
