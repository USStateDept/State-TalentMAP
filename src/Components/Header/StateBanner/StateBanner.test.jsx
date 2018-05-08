import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import StateBanner from './StateBanner';

describe('StateBanner', () => {
  it('is defined', () => {
    const wrapper = shallow(<StateBanner />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<StateBanner />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
