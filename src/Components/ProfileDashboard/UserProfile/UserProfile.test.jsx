import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { bidderUserObject } from '../../../__mocks__/userObject';
import assignmentObject from '../../../__mocks__/assignmentObject';
import UserProfile from './UserProfile';

describe('UserProfileComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<UserProfile
      userProfile={bidderUserObject}
      assignment={assignmentObject}
    />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<UserProfile
      userProfile={bidderUserObject}
      assignment={assignmentObject}
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
