import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import userObject from '../../../../__mocks__/userObject';
import CurrentUserPersonalInformation from './CurrentUserPersonalInformation';

describe('CurrentUserPersonalInformationComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<CurrentUserPersonalInformation userProfile={userObject} />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<CurrentUserPersonalInformation userProfile={userObject} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
