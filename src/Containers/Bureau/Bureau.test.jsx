import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Bureau from './Bureau';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Bureau', () => {
  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <Bureau />
    </MemoryRouter></Provider>);
    expect(wrapper).toBeDefined();
  });
});

