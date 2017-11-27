import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { bidderUserObject } from '../../../../__mocks__/userObject';
import CurrentUserPersonalInformation from './CurrentUserPersonalInformation';

describe('CurrentUserPersonalInformationComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<CurrentUserPersonalInformation userProfile={bidderUserObject} />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<CurrentUserPersonalInformation userProfile={bidderUserObject} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
