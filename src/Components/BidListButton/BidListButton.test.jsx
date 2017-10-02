import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import BidListButton from './BidListButton';

describe('BidListButtonComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <BidListButton />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <BidListButton />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
