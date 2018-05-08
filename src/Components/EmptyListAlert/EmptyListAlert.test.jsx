import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import EmptyListAlert from './EmptyListAlert';

describe('EmptyListAlertComponent', () => {
  const props = {
    textLineOne: 'Here is some text',
    textLineTwo: (<span>And here is an element!</span>),
  };
  it('is defined', () => {
    const wrapper = shallow(<EmptyListAlert {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<EmptyListAlert {...props} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
