import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { bidderUserObject } from '../../../../__mocks__/userObject';
import UserProfilePersonalInformation from './UserProfilePersonalInformation';

describe('UserProfilePersonalInformationComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<UserProfilePersonalInformation userProfile={bidderUserObject} />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<UserProfilePersonalInformation userProfile={bidderUserObject} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
