import { shallow } from 'enzyme';
import React from 'react';
import ResultsList from './ResultsList';
import resultsObject from '../../__mocks__/resultsObject';

describe('ResultsListComponent', () => {
  let results = null;
  let wrapper = null;

  beforeEach(() => {
    results = shallow(
      <ResultsList
        results={resultsObject}
        bidList={[]}
      />,
    );
  });

  it('is defined', () => {
    expect(results).toBeDefined();
  });

  it('can receive props', () => {
    wrapper = shallow(<ResultsList
      results={resultsObject}
      bidList={[]}
    />);
    expect(wrapper.instance().props.results.results[0].position.id).toBe(6);
  });

  it('handles an empty result set', () => {
    wrapper = shallow(<ResultsList
      results={{}}
      bidList={[]}
    />);
    expect(wrapper.find('div').hasClass('results-loading')).toBe(false);
  });
});
