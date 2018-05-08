import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import HowToBid from './HowToBid';

describe('HowToBid', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <HowToBid />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <HowToBid />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
