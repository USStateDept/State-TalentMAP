import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import ProfileDashboard from './ProfileDashboard';
import userObject from '../../__mocks__/userObject';
import assignmentObject from '../../__mocks__/assignmentObject';

describe('ProfileDashboardComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <ProfileDashboard
        userProfile={userObject}
        assignment={assignmentObject}
        isLoading={false}
        assignmentIsLoading={false}
      />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot when loading', () => {
    const wrapper = shallow(
      <ProfileDashboard
        userProfile={userObject}
        assignment={assignmentObject}
        isLoading
        assignmentIsLoading
      />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when editor is shown', () => {
    const wrapper = shallow(
      <ProfileDashboard
        userProfile={userObject}
        assignment={assignmentObject}
        isLoading={false}
        assignmentIsLoading={false}
      />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
