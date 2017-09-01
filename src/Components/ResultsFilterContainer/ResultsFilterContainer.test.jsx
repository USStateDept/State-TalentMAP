import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import ResultsFilterContainer from './ResultsFilterContainer';

describe('ResultsFilterContainerComponent', () => {
  const items = [{
    title: 'title', expanded: true,
  }];

  it('is defined', () => {
    const wrapper = shallow(
      <ResultsFilterContainer
        filters={items}
        onQueryParamUpdate={() => {}}
        onChildToggle={() => {}}
        onQueryParamToggle={() => {}}
        resetFilters={() => {}}
        setAccordion={() => {}}
        selectedAccordion=""
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
      selectedAccordion=""
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
      selectedAccordion=""
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
