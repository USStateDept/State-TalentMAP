import { shallow } from 'enzyme';
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import toJSON from 'enzyme-to-json';
import ResultsCard from './ResultsCard';
import resultsObject from '../../__mocks__/resultsObject';

describe('ResultsCardComponent', () => {
  let result = null;
  let wrapper = null;

  it('is defined', () => {
    result = TestUtils.renderIntoDocument(<MemoryRouter>
      <ResultsCard
        id={1}
        result={resultsObject.results[0]}
        onToggle={() => {}}
        toggleFavorite={() => {}}
        userProfileFavoritePositionIsLoading={false}
        userProfileFavoritePositionHasErrored={false}
        toggleBid={() => {}}
        bidList={[]}
      />
    </MemoryRouter>);
    expect(result).toBeDefined();
  });

  it('can receive props', () => {
    wrapper = shallow(
      <ResultsCard
        id={1}
        result={resultsObject.results[0]}
        onToggle={() => {}}
        toggleFavorite={() => {}}
        userProfileFavoritePositionIsLoading={false}
        userProfileFavoritePositionHasErrored={false}
        toggleBid={() => {}}
        bidList={[]}
      />);
    expect(wrapper.instance().props.result.id).toBe(6);
  });

  it('can receive different types of results', () => {
    wrapper = shallow(
      <ResultsCard
        id={1}
        result={resultsObject.results[1]}
        onToggle={() => {}}
        toggleFavorite={() => {}}
        userProfileFavoritePositionIsLoading={false}
        userProfileFavoritePositionHasErrored={false}
        toggleBid={() => {}}
        bidList={[]}
      />);
    expect(wrapper.instance().props.result.id).toBe(60);
  });

  it('matches snapshot', () => {
    wrapper = shallow(
      <ResultsCard
        id={1}
        result={resultsObject.results[0]}
        onToggle={() => {}}
        toggleFavorite={() => {}}
        userProfileFavoritePositionIsLoading={false}
        userProfileFavoritePositionHasErrored={false}
        toggleBid={() => {}}
        bidList={[]}
      />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
