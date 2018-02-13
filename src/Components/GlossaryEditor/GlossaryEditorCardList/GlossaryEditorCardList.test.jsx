import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import GlossaryEditorCardList from './GlossaryEditorCardList';
import { groupedGlossaryItems, groupedTerms } from '../../../__mocks__/glossaryItems';

describe('GlossaryEditorCardListComponent', () => {
  const props = {
    terms: groupedGlossaryItems,
    submitGlossaryTerm: () => {},
    submitGlossaryFirstLetter: () => {},
    availableLetters: groupedTerms,
  };
  it('is defined', () => {
    const wrapper = shallow(<GlossaryEditorCardList
      {...props}
    />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<GlossaryEditorCardList
      {...props}
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
