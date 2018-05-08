import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Status from './Status';

describe('StatusComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<Status />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<Status />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when hideText is true', () => {
    const wrapper = shallow(<Status hideText />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
