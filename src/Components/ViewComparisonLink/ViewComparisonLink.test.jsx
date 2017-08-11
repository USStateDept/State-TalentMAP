import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import ViewComparisonLink from './ViewComparisonLink';

describe('ViewComparisonLink', () => {
  let viewLink = null;

  beforeEach(() => {
    localStorage.setItem('compare', JSON.stringify(['1', '2']));
    viewLink = TestUtils.renderIntoDocument(<MemoryRouter><ViewComparisonLink /></MemoryRouter>);
  });

  it('is defined', () => {
    expect(viewLink).toBeDefined();
  });
});
