import React from 'react';
import { shallow } from 'enzyme';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import PositionManager from './PositionManager';

describe('BureauPage', () => {
  const props = {
    fetchBureauPositions: EMPTY_FUNCTION,
  };

  it('is defined', () => {
    const wrapper = shallow(<PositionManager.WrappedComponent {...props} />);
    expect(wrapper).toBeDefined();
  });
});
