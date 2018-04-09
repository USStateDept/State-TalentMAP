import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import ResultsCondensedCardFooter from './ResultsCondensedCardFooter';
import resultsObject from '../../__mocks__/resultsObject';

describe('ResultsCondensedCardFooterComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <ResultsCondensedCardFooter
        position={resultsObject.results[0]}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <ResultsCondensedCardFooter
        position={resultsObject.results[0]}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
