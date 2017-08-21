import React from 'react';
import TestUtils from 'react-dom/test-utils';
import Wrapper from './Wrapper';


describe('DetailsComponent', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = TestUtils.renderIntoDocument(<Wrapper />);
  });

  it('is defined', () => {
    expect(wrapper).toBeDefined();
  });
});
