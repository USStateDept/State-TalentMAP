import { shallow } from 'enzyme';
import React from 'react';
import ResultsList, { getIsGroupEnd } from './ResultsList';
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

describe('getIsGroupEnd', () => {
  const results = [
    { position: { post: { location: { city: 'Paris' } } } },
    { position: { post: { location: { city: 'Paris' } } } },
    { position: { post: { location: { city: 'Berlin' } } } },
  ];

  const commuterPostResults = [
    { position: { commuterPost: { description: 'EU Belfast/Dublin' }, post: { location: { city: 'Belfast' } } } },
    { position: { commuterPost: { description: 'EU Belfast/Dublin' }, post: { location: { city: 'Dublin' } } } },
    { position: { commuterPost: { description: 'EU Rome/Vatican City' }, post: { location: { city: 'Rome' } } } },
  ];

  // using results
  it('returns true when post location of next result does not match current result', () => {
    const isGroupEnd = getIsGroupEnd(results, 1);
    expect(isGroupEnd).toBe(true);
  });

  it('returns false when post location of next result matches current result', () => {
    const isGroupEnd = getIsGroupEnd(results, 0);
    expect(isGroupEnd).toBe(false);
  });

  // using commuterPostResults
  it('returns true when commuter post location of next result does not match current result', () => {
    const isGroupEnd = getIsGroupEnd(commuterPostResults, 1);
    expect(isGroupEnd).toBe(true);
  });

  it('returns false when commuter post location of next result does not match current result', () => {
    const isGroupEnd = getIsGroupEnd(commuterPostResults, 0);
    expect(isGroupEnd).toBe(false);
  });

  it('returns false when next result is undefined', () => {
    const isGroupEnd = getIsGroupEnd(commuterPostResults, 2);
    expect(isGroupEnd).toBe(false);
  });
});
