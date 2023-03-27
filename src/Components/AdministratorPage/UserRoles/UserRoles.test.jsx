import { shallow } from 'enzyme';
import sinon from 'sinon';
import UserRoles, { mapDispatchToProps } from './UserRoles';
import { testDispatchFunctions } from '../../../testUtilities/testUtilities';

describe('UserRoles', () => {
  const props = {
    totalUsers: 0,
    usersList: [{
      id: null,
      username: '',
      last_name: '',
      first_name: '',
      groups: [],
    }],
    usersIsLoading: false,
    usersHasErrored: false,
    modifyPermissionIsLoading: false,
    tableStats: [],
    updateUsers: () => {},
  };

  it('is defined', () => {
    const wrapper = shallow(<UserRoles.WrappedComponent {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('updates state on onPageChange function', () => {
    const wrapper = shallow(<UserRoles.WrappedComponent {...props} />);
    wrapper.instance().onPageChange({ page: 4 });
    expect(wrapper.instance().state.page).toBe(4);
  });

  it('calls updateUsers on page change', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<UserRoles.WrappedComponent {...props} updateUsers={spy} />);
    wrapper.instance().onPageChange({ page: 3 });
    sinon.assert.calledOnce(spy);
  });

  it('calls updateUsers on filter change', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<UserRoles.WrappedComponent {...props} updateUsers={spy} />);
    wrapper.instance().filterByPermission({ clicked: true, permission: 'a' });
    sinon.assert.calledOnce(spy);
  });

  it('calls updateUsers on submitting text', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<UserRoles.WrappedComponent {...props} updateUsers={spy} />);
    wrapper.instance().submitText({ preventDefault: () => {} });
    sinon.assert.calledOnce(spy);
  });

  it('calls updateUsers on clearing text', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<UserRoles.WrappedComponent {...props} updateUsers={spy} />);
    wrapper.instance().clearText({ preventDefault: () => {} }, 'name');
    sinon.assert.calledOnce(spy);
  });

  it('calls updateUsers on sorting', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<UserRoles.WrappedComponent {...props} updateUsers={spy} />);
    wrapper.instance().onSortTable('username');
    sinon.assert.calledOnce(spy);
  });

  it('changeText updates state but does not call updateUsers', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<UserRoles.WrappedComponent {...props} updateUsers={spy} />);
    const instance = wrapper.instance();
    instance.changeText({ target: { value: 'hello' } }, 'q_username');
    expect(instance.state.q_username).toBe('hello');
    instance.changeText({ target: { value: 'Jenny' } }, 'q_name');
    expect(instance.state.q_name).toBe('Jenny');
    sinon.assert.notCalled(spy);
  });

  // TODO - revisit these tests per https://github.com/MetaPhase-Consulting/State-TalentMAP/pull/814
  xit('calls the getDelegateRoles function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<UserRoles.WrappedComponent {...props} getDelegateRoles={spy} />);
    wrapper.instance().getDelegateRoles();
    sinon.assert.calledOnce(spy);
  });
});

describe('mapDispatchToProps', () => {
  const config = {
    updateUsers: [1],
  };
  testDispatchFunctions(mapDispatchToProps, config);
});
