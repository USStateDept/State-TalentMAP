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

  it('handles an empty result set', () => {
    wrapper = shallow(<ResultsList
      results={{}}
      bidList={[]}
    />);
    expect(wrapper.find('div').hasClass('results-loading')).toBe(false);
  });
});
