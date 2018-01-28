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
  it('is defined', () => {
    const wrapper = TestUtils.renderIntoDocument(<Provider store={mockStore({})}><MemoryRouter>
      <BidTracker />
    </MemoryRouter></Provider>);
    expect(wrapper).toBeDefined();
  });

  it('can call the getBidList function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <BidTracker.WrappedComponent
        fetchBidList={spy}
        bidListRouteChangeResetState={() => {}}
        submitBidPosition={() => {}}
      />,
    );
    wrapper.instance().getBidList();
    // should be called once on component mount
    sinon.assert.calledTwice(spy);
  });
});

describe('mapDispatchToProps', () => {
  const config = {
    toggleBid: [1, true],
    submitBidPosition: [1],
    acceptBidPosition: [1],
    declineBidPosition: [1],
    deleteBid: [1],
  };
  testDispatchFunctions(mapDispatchToProps, config);
});
