import React from 'react';
import { shallow } from 'enzyme';
import PositionManager from './PositionManager';

describe('BureauPage', () => {
  it('is defined', () => {
    const wrapper = shallow(<PositionManager />);
    expect(wrapper).toBeDefined();
  });
});
