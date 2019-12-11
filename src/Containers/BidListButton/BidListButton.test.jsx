import React from 'react';
import { shallow } from 'enzyme';
import { testDispatchFunctions } from '../../testUtilities/testUtilities';
import BidListButton, { mapDispatchToProps } from './BidListButton';

describe('BidListButton', () => {
  const props = {
    toggleBid: () => {},
    id: 1,
    isLoading: new Set(),
  };

  it('is defined', () => {
    const wrapper = shallow(
      <BidListButton.WrappedComponent {...props} />,
    );
    expect(wrapper).toBeDefined();
  });

  it('is defined when isClient === true', () => {
    const wrapper = shallow(
      <BidListButton.WrappedComponent {...props} />,
      { context: { isClient: true } },
    );
    expect(wrapper).toBeDefined();
  });
});

describe('mapDispatchToProps', () => {
  testDispatchFunctions(mapDispatchToProps, { toggleBid: [1, true] });
});
