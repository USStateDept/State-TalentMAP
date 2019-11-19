import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import TestUtils from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { testDispatchFunctions } from '../../testUtilities/testUtilities';
import BidTracker, { mapDispatchToProps } from './BidTracker';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('BidTracker', () => {
  const props = {
    fetchBidList: () => {},
    bidListRouteChangeResetState: () => {},
    submitBidPosition: () => {},
  };

  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <BidTracker />
    </MemoryRouter></Provider>);
    expect(wrapper).toBeDefined();
  });

  it('is defined after calling scrollToId', () => {
    const wrapper = shallow(<BidTracker.WrappedComponent
      {...props}
    />);
    wrapper.instance().scrollToId(1);
    expect(wrapper).toBeDefined();
  });

  it('is calls fetchUserData() when isPublic === true', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <BidTracker.WrappedComponent {...props} isPublic fetchUserData={spy} />,
    );
    sinon.assert.calledOnce(spy);
    expect(wrapper).toBeDefined();
  });

  it('calls scrollToId when componentDidUpdate is called', () => {
    const wrapper = shallow(<BidTracker.WrappedComponent
      {...props}
      match={{ params: { id: 2 } }}
    />);
    const spy = sinon.spy(wrapper.instance(), 'scrollToId');
    wrapper.instance().componentDidUpdate();
    // called once on mount, once after didUpdate()
    sinon.assert.calledTwice(spy);
  });

  it('calls scrollIntoView when scrollToId is called', () => {
    const wrapper = shallow(<BidTracker.WrappedComponent
      {...props}
    />);
    const spy = sinon.spy();
    global.document.querySelector = () => ({ scrollIntoView: spy });
    wrapper.instance().scrollToId();
    sinon.assert.calledOnce(spy);
    expect(wrapper.instance().state.hasScrolled).toBe(true);
  });

  it('can call the getBidList function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <BidTracker.WrappedComponent
        {...props}
        fetchBidList={spy}
      />,
    );
    wrapper.instance().getBidList();
    // should be called once on component mount
    sinon.assert.calledTwice(spy);
  });
});

describe('mapDispatchToProps', () => {
  const config = {
    submitBidPosition: [1],
    acceptBidPosition: [1],
    declineBidPosition: [1],
    deleteBid: [1],
  };
  testDispatchFunctions(mapDispatchToProps, config);
});
