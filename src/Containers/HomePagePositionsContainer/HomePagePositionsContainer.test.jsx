import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import sinon from 'sinon';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { DEFAULT_HOME_PAGE_FEATURED_POSITIONS, DEFAULT_HOME_PAGE_RECOMMENDED_POSITIONS } from 'Constants/DefaultProps';
import { testDispatchFunctions } from '../../testUtilities/testUtilities';
import HomePagePositionsContainer, { mapDispatchToProps } from './HomePagePositionsContainer';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Home', () => {
  const props = {
    userProfile: {
      id: 4,
      employee_info: {
        grade: '03',
        skills: [{
          code: '0030',
          description: 'Computer Science',
        }],
      },
    },
    bidList: [],
    homePageFeaturedPositions: DEFAULT_HOME_PAGE_FEATURED_POSITIONS,
    homePageRecommendedPositions: DEFAULT_HOME_PAGE_RECOMMENDED_POSITIONS,
    homePageFeaturedPositionsFetchData: () => {},
  };
  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <HomePagePositionsContainer
        {...props}
      />
    </MemoryRouter></Provider>);
    expect(wrapper).toBeDefined();
  });
  // hook-based component. going to wait to use another test framework
  xit('calls homePageFeaturedPositionsFetchData', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <HomePagePositionsContainer.WrappedComponent
        {...props}
        homePageFeaturedPositionsFetchData={spy}
      />);
    expect(wrapper).toBeDefined();
    wrapper.instance().homePageFeaturedPositions();
    sinon.assert.calledOnce(spy);
  });

  it('matches snapshot', () => {
    const wrapper = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <HomePagePositionsContainer
        {...props}
      />
    </MemoryRouter></Provider>);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});

describe('mapDispatchToProps', () => {
  const config = {
    homePageFeaturedPositionsFetchData: [['1'], ['2']],
    homePageRecommendedPositionsFetchData: [['1'], ['2']],
  };
  testDispatchFunctions(mapDispatchToProps, config);
});
