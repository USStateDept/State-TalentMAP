import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import ExternalUserStatus from './ExternalUserStatus';

describe('ExternalUserStatusComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<ExternalUserStatus type="cdo" name="John Doe" />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<ExternalUserStatus type="cdo" name="John Doe" />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when showMail is true', () => {
    const wrapper = shallow(<ExternalUserStatus {...props} showMail />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
