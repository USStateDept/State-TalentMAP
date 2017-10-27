import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import SuggestionChoicePost from './SuggestionChoicePost';

describe('SuggestionChoicePostComponent', () => {
  const suggestion = {
    location: 'test',
  };
  it('is defined', () => {
    const wrapper = shallow(
      <SuggestionChoicePost
        suggestion={suggestion}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <SuggestionChoicePost
        suggestion={suggestion}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
