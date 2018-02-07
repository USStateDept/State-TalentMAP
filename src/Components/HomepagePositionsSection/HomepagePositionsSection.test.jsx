import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import HomePagePositionsSection from './HomePagePositionsSection';

describe('HomePagePositionsSection', () => {
  it('renders', () => {
    const wrapper = ReactTestUtils.renderIntoDocument(<HomePagePositionsSection />);
    expect(wrapper).toBeDefined();
  });
});
