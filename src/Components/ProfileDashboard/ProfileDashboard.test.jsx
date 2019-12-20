import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import ProfileDashboard from './ProfileDashboard';
import { bidderUserObject } from '../../__mocks__/userObject';
import assignmentObject from '../../__mocks__/assignmentObject';
import notificationsObject from '../../__mocks__/notificationsObject';
import bidListObject from '../../__mocks__/bidListObject';

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
      <ProfileDashboard {...props} isPublic />);
    expect(wrapper.find('SearchAsClientButton').exists()).toBe(true);
    wrapper.setProps({ ...props, isPublic: false });
    wrapper.update();
    expect(wrapper.find('SearchAsClientButton').exists()).toBe(false);
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
