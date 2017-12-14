import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { bidderUserObject } from '../../../../__mocks__/userObject';
import UserProfileGeneralInformation from './UserProfileGeneralInformation';

describe('UserProfileGeneralInformationComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<UserProfileGeneralInformation userProfile={bidderUserObject} />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot when showEditLink is true', () => {
    const wrapper = shallow(
      <UserProfileGeneralInformation showEditLink userProfile={bidderUserObject} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when useGroup is true', () => {
    const wrapper = shallow(
      <UserProfileGeneralInformation useGroup userProfile={bidderUserObject} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<UserProfileGeneralInformation userProfile={bidderUserObject} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
