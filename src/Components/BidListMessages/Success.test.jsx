import { shallow } from 'enzyme';
import React from 'react';
import Success from './Success';

describe('Success', () => {
  it('is defined', () => {
    const wrapper = shallow(<Success />);
    expect(wrapper).toBeDefined();
  });
});
