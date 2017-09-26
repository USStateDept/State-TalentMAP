import React from 'react';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import toJSON from 'enzyme-to-json';
import { AccountDropdown } from './AccountDropdown';

describe('AccountDropdown', () => {
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);

  it('is defined', () => {
    const accountDropdown = shallow(<AccountDropdown />);
    expect(accountDropdown).toBeDefined();
  });

  it('can take different props', () => {
    const accountDropdown = shallow(<AccountDropdown userProfile={{ user: { username: 'test' } }} />);
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
    accountDropdown.find('[to="/login"]').simulate('click');
    // logout function should have been called once
    sinon.assert.calledOnce(handleClickSpy);
  });

  it('can call the hideDropdown function', () => {
    const accountDropdown = shallow(<AccountDropdown />);

    // define the instance
    const instance = accountDropdown.instance();
    instance.dropdown = { hide: () => {} };
    // spy the logout function
    const spy = sinon.spy(instance, 'hideDropdown');
    // click to logout
    instance.hideDropdown();
    // logout function should have been called once
    sinon.assert.calledOnce(spy);
  });

  it('matches snapshot', () => {
    const accountDropdown = shallow(<AccountDropdown />);
    expect(toJSON(accountDropdown)).toMatchSnapshot();
  });

  it("can render the logged in user's name", () => {
    const username = 'test';
    const accountDropdown = mount(<Provider store={mockStore({})}><MemoryRouter>
      <AccountDropdown userProfile={{ user: { username } }} />
    </MemoryRouter></Provider>);
    expect(accountDropdown.find('#account-username').text()).toBe(username);
  });
});
