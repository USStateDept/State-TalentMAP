import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import ResultsNewFlag from './ResultsNewFlag';

describe('ResultsNewFlagComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <ResultsNewFlag />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <ResultsNewFlag />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
