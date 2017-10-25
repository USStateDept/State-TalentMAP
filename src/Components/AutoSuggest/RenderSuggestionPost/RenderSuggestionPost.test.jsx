import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import RenderSuggestionPost from './RenderSuggestionPost';

describe('RenderSuggestionPostComponent', () => {
  const suggestion = {
    location: 'test',
  };
  it('is defined', () => {
    const wrapper = shallow(
      <RenderSuggestionPost
        suggestion={suggestion}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <RenderSuggestionPost
        suggestion={suggestion}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
