import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import EditProfile from './EditProfile';

describe('EditProfileComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<EditProfile />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<EditProfile />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
