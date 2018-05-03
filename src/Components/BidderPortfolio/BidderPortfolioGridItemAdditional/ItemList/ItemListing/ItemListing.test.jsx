import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import ItemListing from './ItemListing';

describe('ItemListingComponent', () => {
  const props = {
    items: ['Bid 1', 'Bid 2', 'Bid 3'],
  };
  it('is defined', () => {
    const wrapper = shallow(
      <ItemListing
        {...props}
      />);
    expect(wrapper).toBeDefined();
  });

  it('renders an alert if items.length is 0', () => {
    const wrapper = shallow(
      <ItemListing
        {...props}
        items={[]}
      />);
    expect(wrapper.find('span').exists()).toBe(true);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <ItemListing
        {...props}
      />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
