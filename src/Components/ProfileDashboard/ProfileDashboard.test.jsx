import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { toString } from 'lodash';
import ProfileDashboard from './ProfileDashboard';
import { bidderUserObject } from '../../__mocks__/userObject';
import assignmentObject from '../../__mocks__/assignmentObject';
import notificationsObject from '../../__mocks__/notificationsObject';
import bidListObject from '../../__mocks__/bidListObject';
import classificationsObject from '../../__mocks__/classificationsObject';

describe('ProfileDashboardComponent', () => {
  const props = {
    userProfile: bidderUserObject,
    assignment: assignmentObject,
    isLoading: false,
    assignmentIsLoading: false,
    notifications: notificationsObject.results,
    notificationsIsLoading: false,
    bidList: bidListObject.results,
    bidListIsLoading: false,
    classifications: classificationsObject,
  };

  it('is defined', () => {
    const wrapper = shallow(
      <ProfileDashboard {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('is defined when isPublic', () => {
    const wrapper = shallow(
      <ProfileDashboard {...props} isPublic />);
    expect(wrapper).toBeDefined();
  });

  it('displays the Search as Client button when isPublic', () => {
    const wrapper = shallow(
      <ProfileDashboard {...props} isPublic showSearchAsClient />);

    // Really hacky.
    // This did not work: wrapper.find('Connect(withRouter(SearchAsClientButton))').exists()
    expect(toString(wrapper.debug())).toMatch(/SearchAsClientButton/);
  });
  it('does not display the Search as Client button when not isPublic', () => {
    const wrapper = shallow(
      <ProfileDashboard {...props} />);
    expect(toString(wrapper.debug())).not.toMatch(/SearchAsClientButton/);
  });

  it('matches snapshot when loading', () => {
    const wrapper = shallow(
      <ProfileDashboard
        {...props}
        isLoading
        assignmentIsLoading
        notificationsIsLoading
      />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when loaded', () => {
    const wrapper = shallow(
      <ProfileDashboard {...props} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
