import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Position from './Position';
import routerLocations from '../../__mocks__/routerLocations';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Position', () => {
  it('is defined', () => {
    const position = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <Position
        isAuthorized={() => true}
        onNavigateTo={() => {}}
        routerLocations={routerLocations}
        userProfileFavoritePositionIsLoading={false}
        userProfileFavoritePositionHasErrored={false}
      />
    </MemoryRouter></Provider>);
    expect(position).toBeDefined();
  });

  it('can handle authentication redirects', () => {
    const position = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <Position
        isAuthorized={() => false}
        onNavigateTo={() => {}}
        routerLocations={routerLocations}
        userProfileFavoritePositionIsLoading={false}
        userProfileFavoritePositionHasErrored={false}
      />
    </MemoryRouter></Provider>);
    expect(position).toBeDefined();
  });
});
