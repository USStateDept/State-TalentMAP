import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import GlossaryEditorContainer from './GlossaryEditorContainer';
import { groupedGlossaryItems, groupedTerms } from '../../../__mocks__/glossaryItems';

describe('GlossaryEditorContainerComponent', () => {
  const props = {
    glossaryItems: groupedGlossaryItems,
    submitGlossaryTerm: () => {},
    submitGlossaryFirstLetter: () => {},
    availableLetters: groupedTerms,
  };

  it('is defined', () => {
    const wrapper = shallow(<GlossaryEditorContainer
      {...props}
    />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<GlossaryEditorContainer
      {...props}
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
