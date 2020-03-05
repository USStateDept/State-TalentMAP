import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import ResultsCondensedCard from './ResultsCondensedCard';
import resultsObject from '../../__mocks__/resultsObject';
import bidListObject from '../../__mocks__/bidListObject';

describe('ResultsCondensedCardComponent', () => {
  const type = 'default';
  it('is defined', () => {
    const wrapper = shallow(
      <ResultsCondensedCard
        position={resultsObject.results[0]}
        type={type}
        bidList={bidListObject.results}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <ResultsCondensedCard
        position={resultsObject.results[0]}
        type={type}
        bidList={bidListObject.results}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
