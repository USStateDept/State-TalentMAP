import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import FavoritePositionsContainer, { mapDispatchToProps } from './Favorites';
import { testDispatchFunctions } from '../../testUtilities/testUtilities';
import bidListObject from '../../__mocks__/bidListObject';
import favoritesObject from '../../__mocks__/favoritesObject';

describe('FavoritesContainer', () => {
  const props = {
    fetchData: () => {},
    bidListFetchData: () => {},
    toggleFavorite: () => {},
    favoritePositions: favoritesObject,
    favoritePositionsIsLoading: false,
    favoritePositionsHasErrored: false,
    bidList: bidListObject,
  };

  it('is defined', () => {
    const favorites = shallow(
      <FavoritePositionsContainer.WrappedComponent {...props} />,
    );
    expect(favorites).toBeDefined();
  });

  xit('can call the onToggleFavorite function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <FavoritePositionsContainer.WrappedComponent
        fetchData={() => {}}
        toggleFavorite={spy}
        bidList={bidListObject}
        bidListFetchData={() => {}}
      />,
    );
    wrapper.instance().onToggleFavorite();
    sinon.assert.calledOnce(spy);
  });

  xit('can call the getSortedFavorites function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <FavoritePositionsContainer.WrappedComponent
        fetchData={spy}
        toggleFavorite={() => {}}
        bidList={bidListObject}
        bidListFetchData={() => {}}
      />,
    );
    wrapper.instance().getSortedFavorites({ target: { value: 'title' } });
    // fetchData is called once at mount,
    // and should be called twice after getSortedFavorites is called.
    sinon.assert.calledTwice(spy);
  });
});

describe('mapDispatchToProps', () => {
  const config = {
    toggleFavorite: [1, true],
  };
  testDispatchFunctions(mapDispatchToProps, config);
});
