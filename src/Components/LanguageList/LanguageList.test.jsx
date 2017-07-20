import React from 'react';
import { shallow } from 'enzyme';
import LanguageList from './LanguageList';

describe('DetailsComponent', () => {
  let languageList = null;

  const languages = [
    { id: 1, language: 'French (FR)', written_proficiency: '2', spoken_proficiency: '2', representation: 'French (FR) 2/2' },
    { id: 1, language: 'German (GM)', written_proficiency: '2', spoken_proficiency: '2', representation: 'German (GM) 2/2' },
  ];

  it('is defined', () => {
    languageList = shallow(<LanguageList />);
    expect(languageList).toBeDefined();
  });

  it('it can take props', () => {
    languageList = shallow(<LanguageList languages={languages} />);
    expect(languageList).toBeDefined();
  });

  it('it can take no props', () => {
    languageList = shallow(<LanguageList />);
    expect(languageList).toBeDefined();
  });
});
