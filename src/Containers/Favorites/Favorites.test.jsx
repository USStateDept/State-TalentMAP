import React from 'react';
import { shallow } from 'enzyme';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import FavoritesContainer, { mapDispatchToProps } from './Favorites';
import { testDispatchFunctions } from '../../testUtilities/testUtilities';
import bidListObject from '../../__mocks__/bidListObject';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('FavoritesContainer', () => {
  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <FavoritesContainer />
    </MemoryRouter></Provider>);
    expect(wrapper).toBeDefined();
  });

  it('can call the onToggleFavorite function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <FavoritesContainer.WrappedComponent
        fetchData={() => {}}
        toggleFavorite={spy}
        bidList={bidListObject}
        toggleBid={() => {}}
        bidListFetchData={() => {}}
      />,
    );
    wrapper.instance().onToggleFavorite();
    sinon.assert.calledOnce(spy);
  });

  it('can call the getSortedFavorites function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <FavoritesContainer.WrappedComponent
        fetchData={spy}
        toggleFavorite={() => {}}
        bidList={bidListObject}
        toggleBid={() => {}}
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
    toggleBid: [1, true],
  };
  testDispatchFunctions(mapDispatchToProps, config);
});
