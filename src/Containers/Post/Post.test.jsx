import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import testDispatchFunctions from '../../testUtilities/testUtilities';
import Post, { mapDispatchToProps } from './Post';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Post', () => {
  it('is defined', () => {
    const post = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <Post isAuthorized={() => true} onNavigateTo={() => {}} />
    </MemoryRouter></Provider>);
    expect(post).toBeDefined();
  });

  it('can handle authentication redirects', () => {
    const post = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <Post isAuthorized={() => false} onNavigateTo={() => {}} />
    </MemoryRouter></Provider>);
    expect(post).toBeDefined();
  });
});

describe('mapDispatchToProps', () => {
  const config = {
    fetchData: ['1'],
    onNavigateTo: ['/results'],
  };
  testDispatchFunctions(mapDispatchToProps, config);
});
