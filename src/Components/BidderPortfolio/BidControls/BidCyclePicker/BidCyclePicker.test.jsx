import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import BidCyclePicker, { renderList } from './BidCyclePicker';

describe('BidControlsComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <BidCyclePicker />,
    );
    expect(wrapper).toBeDefined();
  });

  it('sets state when selectOption() is called', () => {
    const wrapper = shallow(
      <BidCyclePicker />,
    );
    const val = 1;
    wrapper.instance().selectOption(val);
    expect(wrapper.instance().state.value).toBe(val);
  });

  it('sets state when selectMultipleOption() is called', () => {
    const wrapper = shallow(
      <BidCyclePicker />,
    );
    const val = [1];
    wrapper.instance().selectMultipleOption(val);
    expect(wrapper.instance().state.arrayValue).toEqual(val);
  });

  it('returns an array of items when renderList() is called', () => {
    const output = renderList(
      { items: ['a', 'b', 'c'], selectValue: () => {}, getIsSelected: () => false },
    );
    expect(output.length).toBe(3);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <BidCyclePicker />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
