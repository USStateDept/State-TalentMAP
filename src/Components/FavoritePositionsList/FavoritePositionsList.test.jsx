import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import FavoritePositionsList from './FavoritePositionsList';
import resultsObject from '../../__mocks__/resultsObject';

describe('FavoritePositionsListComponent', () => {
  it('is defined', () => {
    const wrapper = shallow(
      <FavoritePositionsList
        favorites={resultsObject.results}
        toggleFavorite={() => {}}
        toggleFavoritePositionIsLoading={false}
        toggleFavoritePositionHasErrored={false}
      />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can receive props', () => {
    const wrapper = shallow(
      <FavoritePositionsList
        favorites={resultsObject.results}
        toggleFavorite={() => {}}
        toggleFavoritePositionIsLoading={false}
        toggleFavoritePositionHasErrored={false}
      />,
    );
    expect(wrapper.instance().props.favorites[0].id).toBe(resultsObject.results[0].id);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <FavoritePositionsList
        favorites={resultsObject.results}
        toggleFavorite={() => {}}
        toggleFavoritePositionIsLoading={false}
        toggleFavoritePositionHasErrored={false}
      />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
