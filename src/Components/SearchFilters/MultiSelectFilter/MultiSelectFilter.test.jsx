import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import MultiSelectFilter from './MultiSelectFilter';

describe('MultiSelectFilterComponent', () => {
  const item = {
    item: { title: 'title', selectionRef: 'ref', description: 'filterType' },
    data: [{ isSelected: true, long_description: 'description', description: 'description', title: 'title', name: 'name' },
    { isSelected: true, long_description: 'description', description: 'a description', title: 'title', name: 'name' }],
  };

  it('can receive props', () => {
    const wrapper = shallow(
      <MultiSelectFilter
        queryParamToggle={() => {}}
        item={item}
      />,
    );
    expect(wrapper.instance().props.item.item.title).toBe(item.item.title);
  });

  it('can call the onCheckBoxClick function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <MultiSelectFilter
        queryParamToggle={spy}
        item={item}
      />,
    );
    wrapper.instance().onCheckBoxClick(1, { selectionRef: 'test', code: 'code' });
    sinon.assert.calledOnce(spy);
  });

  it('creates term titles when groupAlpha is true', () => {
    const wrapper = shallow(
      <MultiSelectFilter
        queryParamToggle={() => {}}
        item={item}
        groupAlpha
      />,
    );
    expect(wrapper.find('.term-title').exists()).toBe(true);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <MultiSelectFilter
        queryParamToggle={() => {}}
        item={item}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('matches snapshot when groupAlpha is true', () => {
    const wrapper = shallow(
      <MultiSelectFilter
        queryParamToggle={() => {}}
        item={item}
        groupAlpha
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
