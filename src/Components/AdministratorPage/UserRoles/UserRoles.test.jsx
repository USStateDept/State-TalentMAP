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

  it('call updateUsers on page change', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<UserRoles.WrappedComponent {...props} updateUsers={spy} />);
    wrapper.instance().onPageChange({ page: 3 });
    sinon.assert.calledOnce(spy);
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
