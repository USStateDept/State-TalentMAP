import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import HighlightedPositionsCardList from './HighlightedPositionsCardList';
import resultsObject from '../../__mocks__/resultsObject';

describe('HighlightedPositionsCardListComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <HighlightedPositionsCardList
        positions={resultsObject.results}
        toggleFavorite={() => {}}
        userProfileFavoritePositionIsLoading={false}
        userProfileFavoritePositionHasErrored={false}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can receive props', () => {
    const wrapper = shallow(
      <HighlightedPositionsCardList
        positions={resultsObject.results}
        toggleFavorite={() => {}}
        userProfileFavoritePositionIsLoading={false}
        userProfileFavoritePositionHasErrored={false}
      />,
    );
    expect(wrapper.instance().props.positions[0].id).toBe(resultsObject.results[0].id);
  });

  it('can change className based on isLoading', () => {
    const wrapper = shallow(
      <HighlightedPositionsCardList
        positions={resultsObject.results}
        toggleFavorite={() => {}}
        userProfileFavoritePositionIsLoading={false}
        userProfileFavoritePositionHasErrored={false}
        isLoading
      />,
    );
    expect(wrapper.find('.results-loading')).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <HighlightedPositionsCardList
        positions={resultsObject.results}
        toggleFavorite={() => {}}
        userProfileFavoritePositionIsLoading={false}
        userProfileFavoritePositionHasErrored={false}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
