import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import GroupedCardList from './GroupedCardList';
import { groupedGlossaryItems, groupedTerms } from '../../../../__mocks__/glossaryItems';

describe('GroupedCardListComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(<GroupedCardList
      terms={groupedGlossaryItems}
      submitGlossaryTerm={() => {}}
      groups={groupedTerms}
    />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<GroupedCardList
      terms={groupedGlossaryItems}
      submitGlossaryTerm={() => {}}
      groups={groupedTerms}
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
