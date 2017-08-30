import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Routes from './Routes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Routes', () => {
  it('handles a home route', () => {
    const routes = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <Routes isAuthorized={() => true} />
    </MemoryRouter></Provider>);
    expect(routes).toBeDefined();
  });
  it('handles a login route', () => {
    const routes = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <Routes isAuthorized={() => false} />
    </MemoryRouter></Provider>);
    expect(routes).toBeDefined();
  });
  it('handles a search results route', () => {
    const routes = TestUtils.renderIntoDocument(<Provider store={mockStore({})}>
      <MemoryRouter initialEntries={['/results']}>
        <Routes isAuthorized={() => true} />
      </MemoryRouter></Provider>);
    expect(routes).toBeDefined();
  });
  it('handles a position details route', () => {
    const routes = TestUtils.renderIntoDocument(<Provider store={mockStore({})}>
      <MemoryRouter initialEntries={['/details/00011111']}>
        <Routes isAuthorized={() => true} />
      </MemoryRouter></Provider>);
    expect(routes).toBeDefined();
  });
  it('handles a post details route', () => {
    const routes = TestUtils.renderIntoDocument(<Provider store={mockStore({})}>
      <MemoryRouter initialEntries={['/post/00011111']}>
        <Routes isAuthorized={() => true} />
      </MemoryRouter></Provider>);
    expect(routes).toBeDefined();
  });
  it('handles a compare route', () => {
    const routes = TestUtils.renderIntoDocument(<Provider store={mockStore({})}>
      <MemoryRouter initialEntries={['/compare/00011111,00011112']}>
        <Routes isAuthorized={() => true} />
      </MemoryRouter></Provider>);
    expect(routes).toBeDefined();
  });
});
