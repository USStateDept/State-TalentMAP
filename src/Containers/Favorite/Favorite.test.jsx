import React from 'react';
import { shallow } from 'enzyme';
import { testDispatchFunctions } from '../../testUtilities/testUtilities';
import Favorite, { mapDispatchToProps } from './Favorite';

describe('Favorite', () => {
  const props = {
    onToggle: () => {},
    isLoading: false,
    hasErrored: false,
    refKey: 'key',
    compareArray: [],
  };

  it('is defined', () => {
    const wrapper = shallow(
      <Favorite.WrappedComponent {...props} />,
    );
    expect(wrapper).toBeDefined();
  });
});

describe('mapDispatchToProps', () => {
  testDispatchFunctions(mapDispatchToProps, { onToggle: [1, true] });
});
