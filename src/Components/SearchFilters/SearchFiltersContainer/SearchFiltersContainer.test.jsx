import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import SearchFiltersContainer from './SearchFiltersContainer';
import { ACCORDION_SELECTION } from '../../../Constants/DefaultProps';

describe('SearchFiltersContainerComponent', () => {
  const items = [{
    item: { title: 'title', selectionRef: 'ref' },
    data: [{ isSelected: true }],
  },
  {
    item: { title: 'title2', selectionRef: 'ref2' },
    data: [{ isSelected: false }],
  },
  ];

  const accordion = ACCORDION_SELECTION;

  it('can receive props', () => {
    const wrapper = shallow(
      <SearchFiltersContainer
        queryParamUpdate={() => {}}
        queryParamToggle={() => {}}
        selectedAccordion={accordion}
        setAccordion={() => {}}
        filters={items}
      />,
    );
    expect(wrapper.instance().props.filters[0].item.title).toBe(items[0].item.title);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <SearchFiltersContainer
        queryParamUpdate={() => {}}
        queryParamToggle={() => {}}
        selectedAccordion={accordion}
        setAccordion={() => {}}
        filters={items}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('can call the onBooleanFilterClick function', () => {
    const toggleValue = { value: null };
    const wrapper = shallow(
      <SearchFiltersContainer
        queryParamUpdate={(e) => { toggleValue.value = e; }}
        queryParamToggle={() => {}}
        selectedAccordion={accordion}
        setAccordion={() => {}}
        filters={items}
      />,
    );
    wrapper.instance().onBooleanFilterClick(true, '0', 'skill');
    expect(toggleValue.value.skill).toBe('0');
  });
});
