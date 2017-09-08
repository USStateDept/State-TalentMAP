import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import MultiSelectFilter from './MultiSelectFilter';

describe('MultiSelectFilterComponent', () => {
  const item = {
    item: { title: 'title', selectionRef: 'ref' },
    data: [{ isSelected: true, long_description: 'description', title: 'title', name: 'name' }],
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

  it('matches snapshot', () => {
    const wrapper = shallow(
      <MultiSelectFilter
        queryParamToggle={() => {}}
        item={item}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
