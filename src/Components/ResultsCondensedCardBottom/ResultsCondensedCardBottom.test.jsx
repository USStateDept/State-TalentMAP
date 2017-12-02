import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import ResultsCondensedCardBottom from './ResultsCondensedCardBottom';
import resultsObject from '../../__mocks__/resultsObject';
import bidListObject from '../../__mocks__/bidListObject';

describe('ResultsCondensedCardBottomComponent', () => {
  const type = 'new';
  it('is defined', () => {
    const wrapper = shallow(
      <ResultsCondensedCardBottom
        position={resultsObject.results[0]}
        toggleBid={() => {}}
        bidList={bidListObject.results}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can receive props', () => {
    const wrapper = shallow(
      <ResultsCondensedCardBottom
        position={resultsObject.results[0]}
        toggleBid={() => {}}
        bidList={bidListObject.results}
      />,
    );
    expect(wrapper.instance().props.type).toBe(type);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <ResultsCondensedCardBottom
        position={resultsObject.results[0]}
        toggleBid={() => {}}
        bidList={bidListObject.results}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
