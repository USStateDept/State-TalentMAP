import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Post from './Post';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Main', () => {
  const api = 'http://localhost:8000/api/v1';

  it('is defined', () => {
    const post = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <Post isAuthorized={() => true} api={api} />
    </MemoryRouter></Provider>);
    expect(post).toBeDefined();
  });

  it('it can handle authentication redirects', () => {
    const post = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <Post isAuthorized={() => false} api={api} />
    </MemoryRouter></Provider>);
    expect(post).toBeDefined();
  });
});
