import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router';
import HomePagePositionsSection from './HomePagePositionsSection';

describe('HomePagePositionsSection', () => {
  it('renders', () => {
    const wrapper = ReactTestUtils.renderIntoDocument(<MemoryRouter><HomePagePositionsSection /></MemoryRouter>);
    expect(wrapper).toBeDefined();
  });
});
