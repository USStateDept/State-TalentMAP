import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import ResultsNewFlag from './ResultsNewFlag';

describe('ResultsNewFlagComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <ResultsNewFlag text="test" />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <ResultsNewFlag text="test" />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
