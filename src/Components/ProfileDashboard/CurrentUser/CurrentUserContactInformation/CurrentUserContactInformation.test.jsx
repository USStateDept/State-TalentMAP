import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import userObject from '../../../../__mocks__/userObject';
import CurrentUserContactInformation from './CurrentUserContactInformation';

describe('CurrentUserContactInformationComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<CurrentUserContactInformation userProfile={userObject} />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<CurrentUserContactInformation userProfile={userObject} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
