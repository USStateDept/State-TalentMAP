import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import LanguageList from './LanguageList';

describe('LanguageList', () => {
  let languageList = null;

  const languages = [
    { id: 1, language: 'French (FR)', reading_proficiency: '2', spoken_proficiency: '2', representation: 'French (FR) 2/2' },
    { id: 1, language: 'German (GM)', reading_proficiency: '2', spoken_proficiency: '2', representation: 'German (GM) 2/2' },
  ];

  it('is defined', () => {
    languageList = shallow(<LanguageList />);
    expect(languageList).toBeDefined();
  });

  it('takes props', () => {
    languageList = shallow(<LanguageList languages={languages} />);
    expect(toJSON(languageList)).toMatchSnapshot();
  });

  it('takes no props', () => {
    languageList = shallow(<LanguageList />);
    expect(toJSON(languageList)).toMatchSnapshot();
  });
});
