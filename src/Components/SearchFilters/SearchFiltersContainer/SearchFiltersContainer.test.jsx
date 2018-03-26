import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import toJSON from 'enzyme-to-json';
import SearchFiltersContainer from './SearchFiltersContainer';
import { ACCORDION_SELECTION } from '../../../Constants/DefaultProps';

describe('SearchFiltersContainerComponent', () => {
  const items = [
    {
      item: { title: 'grade', description: 'grade', selectionRef: 'ref' },
      data: [{ isSelected: true }],
    },
    {
      item: { title: 'post', description: 'post', selectionRef: 'ref2' },
      data: [{ isSelected: true }],
    },
    {
      item: { title: 'skill', description: 'skill', selectionRef: 'ref3' },
      data: [{ isSelected: true }],
    },
    {
      item: { title: 'tod', description: 'tod', selectionRef: 'ref3' },
      data: [{ isSelected: true }],
    },
    {
      item: { title: 'COLA', description: 'cola', selectionRef: 'ref4', bool: true },
      data: [{ isSelected: false }],
    },
    {
      item: { title: 'region', description: 'region', selectionRef: 'ref5' },
      data: [{ isSelected: false, long_description: 'test', short_description: 'test' }],
    },
  ];

  const accordion = ACCORDION_SELECTION;

  const props = {
    queryParamUpdate: () => {},
    queryParamToggle: () => {},
    selectedAccordion: accordion,
    setAccordion: () => {},
    filters: items,
    fetchMissionAutocomplete: () => {},
    missionSearchResults: [],
    fetchPostAutocomplete: () => {},
    postSearchResults: [],
    isCDO: false,
  };

  it('is defined', () => {
    const wrapper = shallow(
      <SearchFiltersContainer
        {...props}
      />,
    );
    expect(wrapper.instance()).toBeDefined();
  });

  it('is defined when isCDO is true', () => {
    const wrapper = shallow(
      <SearchFiltersContainer
        {...props}
        isCDO
      />,
    );
    expect(wrapper.instance()).toBeDefined();
  });

  it('can receive props', () => {
    const wrapper = shallow(
      <SearchFiltersContainer
        {...props}
      />,
    );
    expect(wrapper.instance().props.filters[0].item.title).toBe(props.filters[0].item.title);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <SearchFiltersContainer
        {...props}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('can call the onBooleanFilterClick function', () => {
    const toggleValue = { value: null };
    const wrapper = shallow(
      <SearchFiltersContainer
        {...props}
        queryParamUpdate={(e) => { toggleValue.value = e; }}
      />,
    );

    // check the filter
    wrapper.instance().onBooleanFilterClick(true, '0', 'skill');
    expect(toggleValue.value.skill).toBe('0');

    // un-check the filter
    wrapper.instance().onBooleanFilterClick(false, '0', 'skill');
    expect(toggleValue.value.skill).toBe('');
  });

  it('can call the onSetAccordion function', () => {
    const toggleValue = { a: null, b: null };
    const wrapper = shallow(
      <SearchFiltersContainer
        {...props}
        setAccordion={(a) => { toggleValue.a = a.main; toggleValue.b = a.sub; }}
      />,
    );

    wrapper.instance().onSetAccordion(1, 2);
    expect(toggleValue.a).toBe(1);
    expect(toggleValue.b).toBe(2);
  });

  it('can call the on[x]SuggestionSelected functions', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <SearchFiltersContainer
        {...props}
        queryParamToggle={spy}
      />,
    );
    wrapper.instance().onMissionSuggestionSelected(1);
    sinon.assert.calledOnce(spy);
    wrapper.instance().onPostSuggestionSelected(1);
    sinon.assert.calledTwice(spy);
  });

  it('contains Language', () => {
    const filters = [{
      item: { title: 'language', selectionRef: 'ref', description: 'language' },
    }];

    const wrapper = shallow(
      <SearchFiltersContainer
        {...props}
        filters={filters}
      />,
    );
    expect(wrapper.instance().props.filters[0].item.description).toBe('language');
  });

  it('contains Skills', () => {
    const filters = [{
      item: { title: 'skill', selectionRef: 'ref', description: 'skill' },
      data: [
        {
          id: 1,
          code: '001',
          description: 'SKILL 1',
        },
        {
          id: 2,
          code: '002',
          description: 'SKILL 2',
        },
      ],
    }];

    const wrapper = shallow(
      <SearchFiltersContainer
        {...props}
        filters={filters}
      />,
    );
    expect(wrapper.instance().props.filters[0].item.description).toBe('skill');
  });

  it('orders the filters in the correct order', () => {
    // filter order defined in the component
    const filterOrder = ['skill', 'grade', 'post', 'region', 'tod'];
    const wrapper = shallow(
      <SearchFiltersContainer
        {...props}
      />,
    );
    // find the filters we pass to the multiSelectFilterContainer component
    const orderedFilters = wrapper.find('MultiSelectFilterContainer').prop('multiSelectFilterList');
    // the objects should be ordered such that the title matches up with the order of filterOrder
    filterOrder.forEach((title, i) => {
      expect(orderedFilters[i].title).toBe(title);
    });
  });
});
