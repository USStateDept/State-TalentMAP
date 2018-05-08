import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import About from './About';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Feedback', () => {
  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <About />
    </MemoryRouter></Provider>);
    expect(wrapper).toBeDefined();
  });
});
