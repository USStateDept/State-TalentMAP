import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { testDispatchFunctions } from '../../testUtilities/testUtilities';
import CompareDrawerContainer, { mapDispatchToProps } from './CompareDrawerContainer';
import resultsObject from '../../__mocks__/resultsObject';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('CompareDrawerContainer', () => {
  it('is defined', () => {
    const compare = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <CompareDrawerContainer
        fetchData={() => {}}
        comparisons={resultsObject.results}
      />
    </MemoryRouter></Provider>);
    expect(compare).toBeDefined();
  });
});

describe('mapDispatchToProps', () => {
  const config = {
    fetchData: ['1,2'],
  };
  testDispatchFunctions(mapDispatchToProps, config);
});
