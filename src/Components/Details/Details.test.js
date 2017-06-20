import React from 'react';
import TestUtils from 'react-dom/test-utils';
import Details from './Details';


describe('DetailsComponent', () => {
  let detailsItem = null;

  const details = { id: 1 };

  beforeEach(() => {
    detailsItem = TestUtils.renderIntoDocument(<Details details={details} />);
  });

  it('is defined', () => {
    expect(detailsItem).toBeDefined();
  });
});
