import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import TestUtils from 'react-dom/test-utils';
import thunk from 'redux-thunk';
import { testDispatchFunctions } from '../testUtilities/testUtilities';

import Login, { mapDispatchToProps } from './index';

const middlewares = [thunk];
const mockStore = configureStore(middlewares)({});

describe('Login', () => {
  const loginObject = {
    requesting: true,
    successful: false,
    messages: [],
    errors: [],
  };

  const errors = [
    {
      body: 'Request failed with status code 400',
      time: '2017-07-27T20:02:27.683Z',
    },
  ];

  it('can render', () => {
    const wrapper = TestUtils.renderIntoDocument(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Login login={loginObject} />
        </MemoryRouter>
      </Provider>,
    );

    expect(wrapper).toBeDefined();
  });

  it('can render with errors', () => {
    const mock = {
      ...loginObject,
      requesting: false,
      errors,
      messages: errors,
    };

    const wrapper = TestUtils.renderIntoDocument(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Login login={mock} />
        </MemoryRouter>
      </Provider>,
    );

    expect(wrapper).toBeDefined();
  });
});

describe('mapDispatchToProps', () => {
  const config = {
    onSubmit: [{ username: 'u', password: 'p' }],
    tokenValidationRequest: ['token'],
  };
  testDispatchFunctions(mapDispatchToProps, config);
});
