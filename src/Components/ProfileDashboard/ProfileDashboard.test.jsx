import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import ProfileDashboard from './ProfileDashboard';
import { bidderUserObject } from '../../__mocks__/userObject';
import assignmentObject from '../../__mocks__/assignmentObject';
import notificationsObject from '../../__mocks__/notificationsObject';
import bidListObject from '../../__mocks__/bidListObject';

describe('ProfileDashboardComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <ProfileDashboard
        userProfile={bidderUserObject}
        assignment={assignmentObject}
        isLoading={false}
        assignmentIsLoading={false}
        notifications={notificationsObject.results}
        notificationsIsLoading={false}
        bidList={bidListObject.results}
        bidListIsLoading={false}
      />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot when loading', () => {
    const wrapper = shallow(
      <ProfileDashboard
        userProfile={bidderUserObject}
        assignment={assignmentObject}
        isLoading
        assignmentIsLoading
        notifications={notificationsObject.results}
        notificationsIsLoading
        bidList={bidListObject.results}
        bidListIsLoading={false}
      />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when loaded', () => {
    const wrapper = shallow(
      <ProfileDashboard
        userProfile={bidderUserObject}
        assignment={assignmentObject}
        isLoading={false}
        assignmentIsLoading={false}
        notifications={notificationsObject.results}
        notificationsIsLoading={false}
        bidList={bidListObject.results}
        bidListIsLoading={false}
      />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
