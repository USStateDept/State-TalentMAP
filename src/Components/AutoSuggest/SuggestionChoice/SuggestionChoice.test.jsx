import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import SuggestionChoice from './SuggestionChoice';

describe('SuggestionChoiceComponent', () => {
  const suggestion = {
    short_name: 'name',
    code: 'code',
  };
  it('is defined', () => {
    const wrapper = shallow(
      <SuggestionChoice
        suggestion={suggestion}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <SuggestionChoice
        suggestion={suggestion}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
