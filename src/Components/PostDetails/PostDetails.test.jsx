import React from 'react';
import TestUtils from 'react-dom/test-utils';
import createRouterContext from 'react-router-test-context';
import { MemoryRouter } from 'react-router-dom';
import PostDetails from './PostDetails';

describe('PostComponent', () => {
  let post = null;

  const postObject = {
    id: 100,
    tour_of_duty: '1Y2RR',
    code: 'AF1000000',
    location: 'HERAT, AFGHANISTAN',
    cost_of_living_adjustment: 0,
    differential_rate: 35,
    danger_pay: 35,
    rest_relaxation_point: 'London',
    has_consumable_allowance: true,
    has_service_needs_differential: true,
    languages: [{ id: 1, language: 'French (FR)', written_proficiency: '2', spoken_proficiency: '2', representation: 'French (FR) 2/2' }],
  };

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
