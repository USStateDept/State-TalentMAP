import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import ExploreRegionDropdown from './ExploreRegionDropdown';
import items from '../../__mocks__/exploreFilters';

describe('ExploreRegionDropdownComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<ExploreRegionDropdown
      filters={items}
      onRegionSubmit={() => {}}
      selectRegion={() => {}}
    />);
    expect(wrapper).toBeDefined();
  });

  it('can receive props', () => {
    const wrapper = shallow(<ExploreRegionDropdown
      filters={items}
      onRegionSubmit={() => {}}
      selectRegion={() => {}}
    />);
    expect(wrapper.instance().props.filters[0].item.title).toBe(items[0].item.title);
  });

  it('can call the onRegionSubmit function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<ExploreRegionDropdown
      filters={items}
      onRegionSubmit={spy}
      selectRegion={() => {}}
    />);
    wrapper.instance().props.onRegionSubmit();
    sinon.assert.calledOnce(spy);
  });

  it('can call the selectRegion function', () => {
    const value = 'test';
    const spy = sinon.spy();
    const wrapper = shallow(<ExploreRegionDropdown
      filters={items}
      onRegionSubmit={() => {}}
      selectRegion={spy}
    />);
    wrapper.instance().selectRegion({ target: { value } });
    expect(wrapper.instance().state.selection.value).toBe(value);
    sinon.assert.calledOnce(spy);
  });

  it('can call the searchRegion function', () => {
    const value = 'test';
    const submittedValue = { value: null };
    const wrapper = shallow(<ExploreRegionDropdown
      filters={items}
      onRegionSubmit={(e) => { submittedValue.value = e; }}
      selectRegion={() => {}}
    />);
    wrapper.instance().state.selection.value = value;
    wrapper.instance().searchRegion({ preventDefault: () => {} });
    expect(submittedValue.value).toBe(value);
  });
});
