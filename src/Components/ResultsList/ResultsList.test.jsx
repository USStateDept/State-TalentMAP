import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
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
        toggleFavorite={() => {}}
        userProfileFavoritePositionIsLoading={false}
        userProfileFavoritePositionHasErrored={false}
        toggleBid={() => {}}
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
      toggleFavorite={() => {}}
      userProfileFavoritePositionIsLoading={false}
      userProfileFavoritePositionHasErrored={false}
      toggleBid={() => {}}
      bidList={[]}
    />);
    expect(wrapper.instance().props.results.results[0].id).toBe(6);
  });

  it('matches a snapshot with results', () => {
    wrapper = shallow(<ResultsList
      results={resultsObject}
      toggleFavorite={() => {}}
      userProfileFavoritePositionIsLoading={false}
      userProfileFavoritePositionHasErrored={false}
      toggleBid={() => {}}
      bidList={[]}
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('handles an empty result set', () => {
    wrapper = shallow(<ResultsList
      results={{}}
      toggleFavorite={() => {}}
      userProfileFavoritePositionIsLoading={false}
      userProfileFavoritePositionHasErrored={false}
      toggleBid={() => {}}
      bidList={[]}
    />);
    expect(wrapper.find('div').hasClass('results-loading')).toBe(false);
  });

  it('matches a snapshot with an empty result set', () => {
    wrapper = shallow(<ResultsList
      results={{}}
      toggleFavorite={() => {}}
      userProfileFavoritePositionIsLoading={false}
      userProfileFavoritePositionHasErrored={false}
      toggleBid={() => {}}
      bidList={[]}
    />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
