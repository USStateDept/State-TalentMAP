import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import HomePageBanner, { mapDispatchToProps } from './HomePageBanner';
import { testDispatchFunctions } from '../../testUtilities/testUtilities';

describe('HomePageBanner Component', () => {
  let props = {};

  beforeEach(() => {
    props = {
      fetchCount: () => {},
    };
  });

  it('is defined', () => {
    const wrapper = shallow(<HomePageBanner.WrappedComponent {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('is defined when isLoading === true', () => {
    const wrapper = shallow(<HomePageBanner.WrappedComponent {...props} isLoading />);
    expect(wrapper).toBeDefined();
  });

  it('is defined when positionCount > 0', () => {
    const wrapper = shallow(<HomePageBanner.WrappedComponent {...props} positionCount={100} />);
    expect(wrapper).toBeDefined();
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<HomePageBanner.WrappedComponent {...props} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});

describe('mapDispatchToProps', () => {
  testDispatchFunctions(mapDispatchToProps);
});
