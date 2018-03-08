import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import BetaHeader from './BetaHeader';

describe('BetaHeader', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <BetaHeader />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <BetaHeader />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
