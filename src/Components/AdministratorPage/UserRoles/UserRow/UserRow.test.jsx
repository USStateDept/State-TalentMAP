import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import toJSON from 'enzyme-to-json';
import UserRow, { mapDispatchToProps } from './UserRow';
import { userHasPermissions } from 'utilities';
import { testDispatchFunctions } from '../../../../testUtilities/testUtilities';

describe('UserRow', () => {
  const props = {
    userID: 0,
    username: 'myTestUsername',
    name: 'my test',
    permissionGroups: [],
    delegateRoles: {
      superuser: { title: 'Super User', group_id: 1, group_name: 'superuser' },
      glossary_editors: { title: 'Glossary Editor', group_id: 2, group_name: 'glossary_editors' },
      aboutpage_editor: { title: 'About Page Editor', group_id: 3, group_name: 'aboutpage_editor' },
    },
    modifyPermission: () => [],
    updatePermission: () => [],
    checkPermission: () => [],
    onClick: () => [],
  };
  it('is defined', () => {
    const wrapper = shallow(<UserRow.WrappedComponent {...props} />);
    expect(wrapper).toBeDefined();
  });

  xit('calls checkPermission()', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<UserRow.WrappedComponent checkPermission={spy} />);
    wrapper.instance().checkPermission();
    sinon.assert.calledOnce(spy);
  });

  xit('calls updatePermission() on checkbox click', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<UserRow.WrappedComponent {...props} updatePermission={spy} />);
    // wrapper.find('CheckBox').at(0).instance().onCheckBoxClick();
    wrapper.find('CheckBox').at(0).props().onCheckBoxClick();

    sinon.assert.calledOnce(spy);
  });

  xit('calls updatePermission()', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<UserRow.WrappedComponent updatePermission={spy} />);
    wrapper.instance().updatePermission();
    sinon.assert.calledOnce(spy);
  });

  it('calls modifyPermission() from updatePermission()', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<UserRow.WrappedComponent modifyPermission={spy} />);
    wrapper.instance().updatePermission();
    sinon.assert.calledOnce(spy);
  });

  xit('calls userHasPermissions() from checkPermission()', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<UserRow.WrappedComponent userHasPermissions={spy} />);
    wrapper.instance().checkPermission();
    sinon.assert.calledOnce(spy);
  });

  it('checks the table content', () => {
    const wrapper = shallow(<UserRow.WrappedComponent {...props} />);
    expect(wrapper.find('td').at(0).props().children).toBe('myTestUsername');
    expect(wrapper.find('td').at(1).props().children).toBe('my test');
  });

  xit('checks the td checkbox rendering', () => {
    const wrapper = shallow(<UserRow.WrappedComponent {...props} />);
    // expect(wrapper.find('td').at(2).props().children.id).toBe('0-superuser');
    expect(wrapper.find('CheckBox').at(0)).toBe('0-superuser');
    // expect(wrapper.find('CheckBox').at(1).props().children.id).toBe('0-glossary_editors');
    // expect(wrapper.find('CheckBox').at(2).props().children.id).toBe('0-aboutpage_editor');
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <UserRow.WrappedComponent {...props} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});

describe('mapDispatchToProps', () => {
  const config = {
    modifyPermission: [1],
  };
  testDispatchFunctions(mapDispatchToProps, config);
});
