import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { testDispatchFunctions } from '../../testUtilities/testUtilities';
import BidStatistics, { mapDispatchToProps } from './BidStatistics';
import bidStatistics from '../../__mocks__/bidStatistics';

describe('BidStatistics', () => {
  const props = {
    fetchBidStatistics: () => {},
    bidStatistics,
  };

  it('is defined', () => {
    const wrapper = shallow(
      <BidStatistics.WrappedComponent {...props} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('can call the getBidStats function', () => {
    const spy = sinon.spy();
    const wrapper = shallow(
      <BidStatistics.WrappedComponent
        {...props}
        fetchBidStatistics={spy}
      />,
    );
    wrapper.instance().getBidStats();
    // should be called once on component mount
    sinon.assert.calledTwice(spy);
  });
});

describe('mapDispatchToProps', () => {
  testDispatchFunctions(mapDispatchToProps);
});
