import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import StatusCircle from './StatusCircle';

describe('StatusCircle', () => {
  it('is defined', () => {
    const wrapper = shallow(<StatusCircle />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<StatusCircle />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
