import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Item from './Item';

describe('ItemComponent', () => {
  const props = {
    item: 'Bid 1',
  };
  it('is defined', () => {
    const wrapper = shallow(
      <Item
        {...props}
      />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <Item
        {...props}
      />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
