import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import ItemList from './ItemList';

describe('ItemListComponent', () => {
  const props = {
    title: 'Bid List',
    items: ['Bid 1', 'Bid 2', 'Bid 3'],
  };
  it('is defined', () => {
    const wrapper = shallow(
      <ItemList
        {...props}
      />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <ItemList
        {...props}
      />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
