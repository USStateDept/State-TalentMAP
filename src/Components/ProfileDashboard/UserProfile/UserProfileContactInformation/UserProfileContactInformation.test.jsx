import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { bidderUserObject } from '../../../../__mocks__/userObject';
import UserProfileContactInformation from './UserProfileContactInformation';

describe('UserProfileContactInformationComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<UserProfileContactInformation userProfile={bidderUserObject} />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<UserProfileContactInformation userProfile={bidderUserObject} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
