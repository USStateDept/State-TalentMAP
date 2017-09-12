import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import ResultsCondensedCardTop from './ResultsCondensedCardTop';
import resultsObject from '../../__mocks__/resultsObject';

describe('ResultsCondensedCardTopComponent', () => {
  const type = 'new';
  it('is defined', () => {
    const wrapper = shallow(
      <ResultsCondensedCardTop
        position={resultsObject.results[0]}
        type={type}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can receive props', () => {
    const wrapper = shallow(
      <ResultsCondensedCardTop
        position={resultsObject.results[0]}
        type={type}
      />,
    );
    expect(wrapper.instance().props.type).toBe(type);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <ResultsCondensedCardTop
        position={resultsObject.results[0]}
        type={type}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
