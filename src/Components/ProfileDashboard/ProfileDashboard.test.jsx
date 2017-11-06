import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import ProfileDashboard from './ProfileDashboard';
import userObject from '../../__mocks__/userObject';
import assignmentObject from '../../__mocks__/assignmentObject';
import notificationsObject from '../../__mocks__/notificationsObject';

describe('ProfileDashboardComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <ProfileDashboard
        userProfile={userObject}
        assignment={assignmentObject}
        isLoading
        assignmentIsLoading
        notifications={notificationsObject.results}
        notificationsIsLoading={false}
      />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot when editor is shown', () => {
    const wrapper = shallow(
      <ProfileDashboard
        userProfile={userObject}
        assignment={assignmentObject}
        isLoading
        assignmentIsLoading
        notifications={notificationsObject.results}
        notificationsIsLoading={false}
      />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
