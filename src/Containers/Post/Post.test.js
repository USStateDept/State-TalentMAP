import React from 'react';
import TestUtils from 'react-dom/test-utils';
import Post from './Post';

describe('PostComponent', () => {
  let post = null;

  const api = 'http://localhost:8000/api/v1';

  beforeEach(() => {
    post = TestUtils.renderIntoDocument(<Post api={api} />);
  });

  it('is defined', () => {
    expect(post).toBeDefined();
  });
});
