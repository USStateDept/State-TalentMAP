import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import RenderSuggestion from './RenderSuggestion';

describe('RenderSuggestionComponent', () => {
  const suggestion = {
    short_name: 'name',
    code: 'code',
  };
  it('is defined', () => {
    const wrapper = shallow(
      <RenderSuggestion
        suggestion={suggestion}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <RenderSuggestion
        suggestion={suggestion}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
