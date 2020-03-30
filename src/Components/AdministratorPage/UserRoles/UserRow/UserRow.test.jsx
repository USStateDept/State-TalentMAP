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
    delegateRoles: {
      superuser: { title: 'Super User', group_id: 1, group_name: 'superuser' },
      glossary_editors: { title: 'Glossary Editor', group_id: 2, group_name: 'glossary_editors' },
      aboutpage_editor: { title: 'About Page Editor', group_id: 3, group_name: 'aboutpage_editor' },
    },
    modifyPermission: () => [],
    updatePermission: () => [],
    onClick: () => [],
  };
  it('is defined', () => {
    const wrapper = shallow(<UserRow.WrappedComponent {...props} />);
    expect(wrapper).toBeDefined();
  });

  xit('calls the checkPermission function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<UserRow.WrappedComponent checkPermission={spy} />);
    wrapper.instance().checkPermission();
    sinon.assert.calledOnce(spy);
  });

  xit('calls the updatePermission function on checkbox click', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<UserRow.WrappedComponent updatePermission={spy} />);
    wrapper.find('input').onCheck();
    sinon.assert.calledOnce(spy);
  });

  xit('calls the updatePermission function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<UserRow.WrappedComponent updatePermission={spy} />);
    wrapper.instance().updatePermission();
    sinon.assert.calledOnce(spy);
  });

  it('calls the modifyPermission function from the updatePermission function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<UserRow.WrappedComponent modifyPermission={spy} />);
    wrapper.instance().updatePermission();
    sinon.assert.calledOnce(spy);
  });


  xit('checks the table content', () => {
    const wrapper = shallow(<UserRow.WrappedComponent {...props} />);
    expect(wrapper.find('td').at(0)).toBe('myTestUsername');
    expect(wrapper.find('td').at(1).props().name).toBe('my test');
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <UserRow.WrappedComponent {...props} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
