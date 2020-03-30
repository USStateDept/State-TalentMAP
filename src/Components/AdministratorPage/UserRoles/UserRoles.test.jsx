import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import UserRoles from './UserRoles';

describe('UserRoles', () => {
  it('is defined', () => {
    const wrapper = shallow(<UserRoles.WrappedComponent />);
    expect(wrapper).toBeDefined();
  });

  it('calls the getDelegateRoles function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<UserRoles.WrappedComponent getDelegateRoles={spy} />);
    wrapper.instance().getDelegateRoles();
    sinon.assert.calledOnce(spy);
  });
});
