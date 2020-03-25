import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import toJSON from 'enzyme-to-json';
import UserRow from './UserRow';

describe('UserRow', () => {
  const props = {
    userID: 0,
    username: 'myTestUsername',
    name: 'my test',
    permissionGroups: [],
    delegateRoles: {},
    modifyPermission: () => [],
    onClick: () => [],
  };

  it('is defined', () => {
    const wrapper = shallow(<UserRow.WrappedComponent {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('calls the checkPermission function', () => { // TODO: fix
    const spy = sinon.spy();
    const wrapper = shallow(
      <UserRow.WrappedComponent userHasPermissions={spy} />,
    );
    wrapper.instance().checkPermission();
    sinon.assert.calledOnce(spy);
  });

  it('calls the updatePermission function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <UserRow.WrappedComponent modifyPermission={spy} />,
    );
    wrapper.instance().updatePermission();
    sinon.assert.calledOnce(spy);
  });


  it('checks the table content', () => {
    const lclProps = {
      username: 'myTestUsername',
      name: 'my test',
    };

    const wrapper = shallow(
      <UserRow.WrappedComponent props={props} />,
      // <UserRow.WrappedComponent props={lclProps} />,
      // <UserRow.WrappedComponent {...props} />,
    );
    /*    const wrapper = TestUtils.renderIntoDocument(
    <Provider store={mockStore({})}><MemoryRouter>
      <UserRow props={lclProps} />
    </MemoryRouter></Provider>); */

    expect(wrapper.find('td').at(0).props().username).toBe('myTestUsername');
    expect(wrapper.find('td').at(1).props().name).toBe('my test');
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <UserRow.WrappedComponent {...props} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
