import React from 'react';
import { shallow } from 'enzyme';
import { testDispatchFunctions } from '../../testUtilities/testUtilities';
import BidListButton, { mapDispatchToProps } from './BidListButton';

describe('BidListButton', () => {
  const props = {
    toggleBid: () => {},
    id: 1,
    isLoading: false,
  };

  it('is defined', () => {
    const wrapper = shallow(
      <BidListButton.WrappedComponent {...props} />,
    );
    expect(wrapper).toBeDefined();
  });
});

describe('mapDispatchToProps', () => {
  testDispatchFunctions(mapDispatchToProps, { toggleBid: [1, true] });
});
