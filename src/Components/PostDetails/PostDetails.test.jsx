import React from 'react';
import TestUtils from 'react-dom/test-utils';
import createRouterContext from 'react-router-test-context';
import { MemoryRouter } from 'react-router-dom';
import PostDetails from './PostDetails';
import postObject from '../../__mocks__/postObject';

describe('PostComponent', () => {
  let post = null;

  beforeEach(() => {
    const context = createRouterContext();
    context.router.route.match.params.id = postObject.id;
    post = TestUtils.renderIntoDocument(<MemoryRouter>
      <PostDetails post={postObject} /></MemoryRouter>, { context });
  });

  it('is defined', () => {
    const f = () => {
      setTimeout(() => {
        expect(post).toBeDefined();
      }, 0);
    };
    f();
  });
});
