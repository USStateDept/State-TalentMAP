import React from 'react';
import { shallow } from 'enzyme';
import CheckboxList from './CheckboxList';

describe('CheckboxList', () => {
  const props = {
    id: 'a',
    isDisabled: false,
  };
  it('is defined', () => {
    const wrapper = shallow(<CheckboxList
      {...props}
    />);
    expect(wrapper).toBeDefined();
  });

  it('is defined when isDisabled is true', () => {
    const wrapper = shallow(<CheckboxList
      {...props}
      isDisabled
    />);
    expect(wrapper).toBeDefined();
  });
});
