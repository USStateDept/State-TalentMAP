import React from 'react';
import { shallow } from 'enzyme';
import Faq from './Faq';

describe('Faq', () => {
  it('is defined', () => {
    const wrapper = shallow(<Faq />);
    expect(wrapper).toBeDefined();
  });
});
