import { shallow } from 'enzyme';
import sinon from 'sinon';
import { QueryParamProvider } from 'use-query-params';
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
    const favorites = shallow(<QueryParamProvider>
      <FavoritePositionsContainer.WrappedComponent {...props} /></QueryParamProvider>,
    );
    expect(favorites).toBeDefined();
  });

  xit('can call the onToggleFavorite function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<QueryParamProvider>
      <FavoritePositionsContainer.WrappedComponent
        fetchData={() => {}}
        toggleFavorite={spy}
        bidList={bidListObject}
        bidListFetchData={() => {}}
      /></QueryParamProvider>,
    );
    wrapper.instance().onToggleFavorite();
    sinon.assert.calledOnce(spy);
  });

  xit('can call the getSortedFavorites function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<QueryParamProvider>
      <FavoritePositionsContainer.WrappedComponent
        fetchData={spy}
        toggleFavorite={() => {}}
        bidList={bidListObject}
        bidListFetchData={() => {}}
      /></QueryParamProvider>,
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
