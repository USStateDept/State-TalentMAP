import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import CDOInfo from './CDOInfo';

describe('CDOInfoComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<CDOInfo name="John Doe" />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<CDOInfo name="John Doe" />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
