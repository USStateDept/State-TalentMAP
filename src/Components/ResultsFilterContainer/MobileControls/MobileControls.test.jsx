import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import MobileControls, { mapDispatchToProps } from './MobileControls';
import { testDispatchFunctions } from '../../../testUtilities/testUtilities';

describe('Splash', () => {
  it('is defined', () => {
    const wrapper = shallow(<MobileControls.WrappedComponent />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<MobileControls.WrappedComponent />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});

describe('mapDispatchToProps', () => {
  testDispatchFunctions(mapDispatchToProps);
});
