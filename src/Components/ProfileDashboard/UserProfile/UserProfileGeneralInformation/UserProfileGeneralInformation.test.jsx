import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { bidderUserObject } from '../../../../__mocks__/userObject';
import {
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

  // needs to be updated to account for conditional rendering
  xit('renders Avatar', () => {
    const wrapper = shallow(<UserProfileGeneralInformation.WrappedComponent
      userProfile={bidderUserObject}
      colorProp="displayName"
      isPublic
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

  it('matches snapshot', () => {
    const wrapper = shallow(<UserProfileGeneralInformation.WrappedComponent
      userProfile={bidderUserObject}
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
