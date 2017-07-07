import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import createRouterContext from 'react-router-test-context';
import Post from './Post';

describe('PostComponent', () => {
  let post = null;

  const api = 'http://localhost:8000/api/v1';

  const postObject = {
    id: 100,
    tour_of_duty: '1Y2RR',
    code: 'AF1000000',
    description: 'HERAT, AFGHANISTAN',
    cost_of_living_adjustment: 0,
    differential_rate: 35,
    danger_pay: 35,
    rest_relaxation_point: 'London',
    has_consumable_allowance: true,
    has_service_needs_differential: true,
    languages: [{ id: 1, language: 'French (FR)', written_proficiency: '2', spoken_proficiency: '2', representation: 'French (FR) 2/2' }],
  };

  beforeEach(() => {
    const mockAdapter = new MockAdapter(axios);

    mockAdapter.onGet(`http://localhost:8000/api/v1/organization/posts/${postObject.id}/`).reply(200,
      postObject,
    );

    const context = createRouterContext();
    context.router.route.match.params.id = postObject.id;
    post = shallow(<Post api={api} />, { context });
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
