import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { testDispatchFunctions } from '../../testUtilities/testUtilities';
import Share, { mapDispatchToProps } from './Share';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Main', () => {
  it('is defined', () => {
    const share = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <Share identifier={5} />
    </MemoryRouter></Provider>);
    expect(share).toBeDefined();
  });
});

describe('mapDispatchToProps', () => {
  const config = {
    sendData: ['', {}],
  };
  testDispatchFunctions(mapDispatchToProps, config);
});
