import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { testDispatchFunctions } from '../../testUtilities/testUtilities';
import PositionSimilarPositions, { mapDispatchToProps } from './PositionSimilarPositions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('PositionSimilarPositions', () => {
  const props = {
    id: 1,
  };

  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <PositionSimilarPositions {...props} />
    </MemoryRouter></Provider>);
    expect(wrapper).toBeDefined();
  });
});

describe('mapDispatchToProps', () => {
  const config = {
    fetchSimilarPositions: [1],
    toggleFavorite: [1, true],
    toggleBid: [1, true],
  };
  testDispatchFunctions(mapDispatchToProps, config);
});
