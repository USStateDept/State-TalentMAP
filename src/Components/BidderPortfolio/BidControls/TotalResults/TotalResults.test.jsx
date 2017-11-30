import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import TotalResults from './TotalResults';

describe('TotalResultsComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <TotalResults
        numerator={5}
        denominator={10}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <TotalResults
        numerator={5}
        denominator={10}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
