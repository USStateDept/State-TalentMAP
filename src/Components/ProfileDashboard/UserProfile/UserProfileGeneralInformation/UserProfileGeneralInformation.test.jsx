import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { bidderUserObject } from '../../../../__mocks__/userObject';
import {
  expectMockWasCalled,
  spyMockAdapter,
  testDispatchFunctions,
} from '../../../../testUtilities/testUtilities';
import UserProfileGeneralInformation, { mapDispatchToProps } from './UserProfileGeneralInformation';

describe('UserProfileGeneralInformationComponent', () => {
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

  describe('mapDispatchToProps', () => {
    const config = {
      onToastError: ['CzHHiJ2kw'],
      onToastInfo: ['CzHHiJ2kw'],
      onToastSuccess: ['CzHHiJ2kw'],
    };
    testDispatchFunctions(mapDispatchToProps, config);
  });

  it('get Employee Profile URL', (done) => {
    let mock;
    let spy;
    ({ mock, spy } = spyMockAdapter({
      url: 'HR/Employees/4/EmployeeProfileReportByCDO',
      response: [200, { data: 'arraybuffer',
        type: 'application/pdf' }],
    })); mock();

    const wrapper = shallow(<UserProfileGeneralInformation.WrappedComponent
      userProfile={bidderUserObject}
    />);

    wrapper.instance().getEmployeeProfile();

    expectMockWasCalled({ spy, cb: done });
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<UserProfileGeneralInformation.WrappedComponent
      userProfile={bidderUserObject}
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
