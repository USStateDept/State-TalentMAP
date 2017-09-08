import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import ResultsFilterContainer from './ResultsFilterContainer';
import { ACCORDION_SELECTION } from '../../Constants/DefaultProps';

describe('ResultsFilterContainerComponent', () => {
  const items = [{
    title: 'title', expanded: true,
  }];

  const accordion = ACCORDION_SELECTION;

  it('is defined', () => {
    const wrapper = shallow(
      <ResultsFilterContainer
        filters={items}
        onQueryParamUpdate={() => {}}
        onChildToggle={() => {}}
        onQueryParamToggle={() => {}}
        resetFilters={() => {}}
        setAccordion={() => {}}
        selectedAccordion={accordion}
      />);
    expect(wrapper).toBeDefined();
  });

  it('can receive props', () => {
    const wrapper = shallow(<ResultsFilterContainer
      filters={items}
      onQueryParamUpdate={() => {}}
      onChildToggle={() => {}}
      onQueryParamToggle={() => {}}
      resetFilters={() => {}}
      setAccordion={() => {}}
      selectedAccordion={accordion}
    />);
    expect(wrapper.instance().props.filters).toBe(items);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<ResultsFilterContainer
      filters={items}
      onQueryParamUpdate={() => {}}
      onChildToggle={() => {}}
      onQueryParamToggle={() => {}}
      resetFilters={() => {}}
      setAccordion={() => {}}
      selectedAccordion={accordion}
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
