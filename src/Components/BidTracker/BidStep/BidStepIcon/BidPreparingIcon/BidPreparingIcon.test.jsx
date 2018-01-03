import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import BidPreparingIcon from './BidPreparingIcon';

describe('BidPreparingIconComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <BidPreparingIcon />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <BidPreparingIcon />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
