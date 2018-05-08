import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import FavoritePositions from './FavoritePositions';
import resultsObject from '../../__mocks__/resultsObject';
import bidListObject from '../../__mocks__/bidListObject';

describe('FavoritePositionsComponent', () => {
  const props = {
    favorites: resultsObject,
    toggleFavorite: () => {},
    toggleFavoritePositionIsLoading: false,
    toggleFavoritePositionHasErrored: false,
    favoritePositionsIsLoading: false,
    favoritePositionsHasErrored: false,
    bidList: bidListObject.results,
    toggleBid: () => {},
    onSortChange: () => {},
  };

  it('is defined', () => {
    const wrapper = shallow(
      <FavoritePositions {...props} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can receive props', () => {
    const wrapper = shallow(
      <FavoritePositions {...props} />,
    );
    expect(wrapper.instance().props.favorites).toBe(resultsObject);
  });

  it('displays an alert if there are no positions', () => {
    const wrapper = shallow(
      <FavoritePositions
        {...props}
        favorites={{ results: [] }}
        favoritePositionsIsLoading={false}
      />,
    );
    expect(wrapper.find('NoFavorites').exists()).toBe(true);
  });

  it('renders the Spinner when loading', () => {
    const wrapper = shallow(
      <FavoritePositions {...props} />,
    );
    expect(wrapper.instance().props.favorites).toBe(resultsObject);
  });

  it('renders the Spinner when loading', () => {
    const wrapper = shallow(
      <FavoritePositions
        {...props}
        favoritePositionsIsLoading
        favoritePositionsHasErrored={false}
      />,
    );
    expect(wrapper.find('Spinner').exists()).toBe(true);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <FavoritePositions {...props} />,
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
