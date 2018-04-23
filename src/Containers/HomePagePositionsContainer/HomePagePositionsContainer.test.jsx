import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { testDispatchFunctions } from '../../testUtilities/testUtilities';
import HomePagePositionsContainer, { mapDispatchToProps } from './HomePagePositionsContainer';
import { DEFAULT_HOME_PAGE_POSITIONS } from '../../Constants/DefaultProps';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Home', () => {
  const props = {
    userProfile: { id: 1, skills: [], grade: '01' },
    userProfileFavoritePositionIsLoading: false,
    userProfileFavoritePositionHasErrored: false,
    toggleFavorite: () => {},
    toggleBid: () => {},
    onNavigateTo: () => {},
    bidList: [],
    homePagePositions: DEFAULT_HOME_PAGE_POSITIONS,
  };
  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <HomePagePositionsContainer
        {...props}
      />
    </MemoryRouter></Provider>);
    expect(wrapper).toBeDefined();
  });

  it('fetches data on componentWillMount', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <HomePagePositionsContainer.WrappedComponent
        {...props}
        homePagePositionsFetchData={spy}
      />);
    expect(wrapper).toBeDefined();
    sinon.assert.calledOnce(spy);
  });

  it('fetches data on componentWillReceiveProps', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <HomePagePositionsContainer.WrappedComponent
        {...props}
        homePagePositionsFetchData={spy}
      />);
    wrapper.instance().setState({ hasFetched: false });
    wrapper.setProps({});
    expect(wrapper.instance().state.hasFetched).toBe(true);
    sinon.assert.calledTwice(spy);
  });
});

describe('mapDispatchToProps', () => {
  const config = {
    homePagePositionsFetchData: [['1'], ['2']],
  };
  testDispatchFunctions(mapDispatchToProps, config);
});
