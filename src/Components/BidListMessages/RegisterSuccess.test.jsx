import { shallow } from 'enzyme';
import React from 'react';
import RegisterSuccess from './RegisterSuccess';

describe('RegisterSuccess', () => {
  it('is defined', () => {
    const wrapper = shallow(<RegisterSuccess undo={() => {}} />);
    expect(wrapper).toBeDefined();
  });
});
