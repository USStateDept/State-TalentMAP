import { shallow } from 'enzyme';
import sinon from 'sinon';
import toJSON from 'enzyme-to-json';
import { bidderUserObject } from '../../../../__mocks__/userObject';
import UserProfileGeneralInformation from './UserProfileGeneralInformation';

describe('UserProfileGeneralInformationComponent', () => {
  const props = {
    getEmployeeProfile: () => {},
  };

  it('is defined', () => {
    const wrapper = shallow(<UserProfileGeneralInformation.WrappedComponent
      userProfile={bidderUserObject}
    />);
    expect(wrapper).toBeDefined();
  });

  it('renders current user name', () => {
    const wrapper = shallow(<UserProfileGeneralInformation.WrappedComponent
      userProfile={bidderUserObject}
    />);
    expect(wrapper.find('.name-group').children().find('PositionInformation').at(0)
      .props().title).toBe('Doe, John');
  });

  it('renders Avatar', () => {
    const wrapper = shallow(<UserProfileGeneralInformation.WrappedComponent
      userProfile={bidderUserObject}
      colorProp="displayName"
      useColor
    />);
    expect(wrapper.find('Avatar').props().colorString).toBe('John');
    expect(wrapper.find('Avatar').props().initials).toBe('JD');
  });

  it('matches snapshot when showEditLink is true', () => {
    const wrapper = shallow(
      <UserProfileGeneralInformation.WrappedComponent
        showEditLink
        userProfile={bidderUserObject}
      />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when useGroup is true', () => {
    const wrapper = shallow(
      <UserProfileGeneralInformation.WrappedComponent
        useGroup
        userProfile={bidderUserObject}
      />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  // could not get these to work :[
  /*  xdescribe('mapDispatchToProps', () => {
    const config = {
      onToastError: ['CzHHiJ2kw'],
      onToastInfo: ['CzHHiJ2kw'],
      onToastSuccess: ['CzHHiJ2kw'],
    };
    const config2 = {
      toastError: ['CzHHiJ2kw'],
      toastInfo: ['CzHHiJ2kw'],
      toastSuccess: ['CzHHiJ2kw'],
    };
    testDispatchFunctions(mapDispatchToProps, config2);
  });

  xdescribe('mapDispatchToProps', () => {
    testDispatchFunctions(mapDispatchToProps);
  }); */

  /* nope
  it('current 2', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<UserProfileGeneralInformation.WrappedComponent
      userProfile={bidderUserObject}
      {...props}
      getEmployeeProfile={spy}
    />);
    expect(wrapper).toBeDefined();
    wrapper.instance().getEmployeeProfile();
    sinon.assert.calledOnce(spy);
  }); */

  it('matches snapshot', () => {
    const wrapper = shallow(<UserProfileGeneralInformation.WrappedComponent
      userProfile={bidderUserObject}
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
