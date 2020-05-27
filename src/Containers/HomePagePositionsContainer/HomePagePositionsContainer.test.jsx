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

  it('fetches data on componentDidMount', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <HomePagePositionsContainer.WrappedComponent
        {...props}
        homePagePositionsFetchData={spy}
      />);
    expect(wrapper).toBeDefined();
    wrapper.instance().componentDidMount();
    sinon.assert.calledOnce(spy);
  });

  it('fetches data on prop update', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <HomePagePositionsContainer.WrappedComponent
        {...props}
        homePagePositionsFetchData={spy}
      />);
    wrapper.instance().setState({ hasFetched: false });
    wrapper.setProps({});
    sinon.assert.calledOnce(spy);
  });

  it('does not fetch data on prop update when hasFetched is true', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <HomePagePositionsContainer.WrappedComponent
        {...props}
        homePagePositionsFetchData={spy}
      />);
    wrapper.instance().setState({ hasFetched: true });
    wrapper.setProps({});
    expect(wrapper.instance().state.hasFetched).toBe(true);
    sinon.assert.notCalled(spy);
  });

  it('does not fetch data on prop update when hasFetched is true', (done) => {
    const wrapper = shallow(
      <HomePagePositionsContainer.WrappedComponent
        {...props}
        userProfile={{}}
        homePagePositionsIsLoading
      />);
    wrapper.instance().UNSAFE_componentWillReceiveProps({
      ...props,
      homePagePositionsIsLoading: false,
    });
    setTimeout(() => {
      expect(wrapper.instance().state.hasFetched).toBe(true);
      done();
    }, 5);
  });
});

describe('mapDispatchToProps', () => {
  const config = {
    homePagePositionsFetchData: [['1'], ['2']],
  };
  testDispatchFunctions(mapDispatchToProps, config);
});
