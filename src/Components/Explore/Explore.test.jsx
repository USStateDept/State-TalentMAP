import { shallow } from 'enzyme';
import React from 'react';
import Explore from './Explore';
import items from '../../__mocks__/exploreFilters';

describe('Explore', () => {
  it('is defined', () => {
    const wrapper = shallow(<Explore
      filters={items}
      onRegionSubmit={() => {}}
    />);
    expect(wrapper).toBeDefined();
  });

  it('can receive props', () => {
    const wrapper = shallow(<Explore
      filters={items}
      onRegionSubmit={() => {}}
    />);
    expect(wrapper.instance().props.filters[0].item.title).toBe(items[0].item.title);
  });
});
