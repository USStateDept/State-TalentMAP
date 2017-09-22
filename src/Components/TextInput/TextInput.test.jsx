import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import TextInput from './TextInput';

describe('TextInputComponent', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(
      <TextInput />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
