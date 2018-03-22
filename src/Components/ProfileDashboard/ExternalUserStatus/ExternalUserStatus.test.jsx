import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import ExternalUserStatus from './ExternalUserStatus';

describe('ExternalUserStatusComponent', () => {
  const props = {
    type: 'cdo',
    initials: 'JD',
    firstName: 'John',
    lastName: 'Doe',
  };

  it('is defined', () => {
    const wrapper = shallow(<ExternalUserStatus {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<ExternalUserStatus {...props} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
