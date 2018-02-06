import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import HomepagePositionsSection from './HomepagePositionsSection';

describe('HomepagePositionsSection', () => {
  it('renders', () => {
    const wrapper = ReactTestUtils.renderIntoDocument(<HomepagePositionsSection />);
    expect(wrapper).toBeDefined();
  });
});
