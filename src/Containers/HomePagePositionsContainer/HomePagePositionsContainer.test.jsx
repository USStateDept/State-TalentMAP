import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { testDispatchFunctions } from '../../testUtilities/testUtilities';
import HomePagePositionsContainer, { mapDispatchToProps } from './HomePagePositionsContainer';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Home', () => {
  it('is defined', () => {
    const home = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <HomePagePositionsContainer
        userProfile={{ skills: [], grade: '01' }}
        userProfileFavoritePositionIsLoading={false}
        userProfileFavoritePositionHasErrored={false}
        toggleFavorite={() => {}}
        toggleBid={() => {}}
        onNavigateTo={() => {}}
        bidList={[]}
        homePagePositions={{ isServiceNeed: [], isSkillCode: [], isGradeAndRecent: [] }}
      />
    </MemoryRouter></Provider>);
    expect(home).toBeDefined();
  });
});

describe('mapDispatchToProps', () => {
  const config = {
    homePagePositionsFetchData: [['1'], ['2']],
  };
  testDispatchFunctions(mapDispatchToProps, config);
});
