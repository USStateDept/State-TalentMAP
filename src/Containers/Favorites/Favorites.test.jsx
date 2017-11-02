import React from 'react';
import { shallow } from 'enzyme';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import FavoritesContainer from './Favorites';

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
      />,
    );
    wrapper.instance().onToggleFavorite();
    sinon.assert.calledOnce(spy);
  });
});
