import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { AccountDropdown } from './AccountDropdown';

describe('AccountDropdown', () => {
  it('is defined', () => {
    const accountDropdown = shallow(<AccountDropdown />);
    expect(accountDropdown).toBeDefined();
  });

  it('can click the logout link', () => {
    const accountDropdown = shallow(<AccountDropdown />);

    // define the instance
    const instance = accountDropdown.instance();
    // spy the logout function
    const handleClickSpy = sinon.spy(instance, 'logout');
    // forceUpdate required for test to pass
    instance.forceUpdate();
    // click to logout
    accountDropdown.find('[to="login"]').simulate('click');
    // logout function should have been called once
    sinon.assert.calledOnce(handleClickSpy);
  });

  it('matches snapshot', () => {
    const accountDropdown = shallow(<AccountDropdown />);
    expect(toJSON(accountDropdown)).toMatchSnapshot();
  });
});
