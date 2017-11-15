import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import StartEnd from './StartEnd';

describe('StartEndComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<StartEnd start="10-10-2017" end="10-10-2019" />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<StartEnd start="10-10-2017" end="10-10-2019" />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
