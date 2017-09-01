import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import LanguageFilter from './LanguageFilter';

describe('LanguageFilterComponent', () => {
  const data = { data: [{ short_description: 'language', isSelected: true }] };

  const selectedAccordion = {
    main: '', sub: '',
  };

  it('can receive props', () => {
    const wrapper = shallow(
      <LanguageFilter
        item={data}
        queryParamUpdate={() => {}}
        selectedAccordion={selectedAccordion}
      />,
    );
    expect(
      wrapper.instance().props.item.data[0].short_description).toBe(data.data[0].short_description,
    );
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <LanguageFilter
        item={data}
        queryParamUpdate={() => {}}
        selectedAccordion={selectedAccordion}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
