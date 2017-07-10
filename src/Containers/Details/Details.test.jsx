import { shallow } from 'enzyme';
import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import createRouterContext from 'react-router-test-context';
import Details from './Details';

describe('DetailsComponent', () => {
  const id = '00003026';
  const idWithLang = '00003027';

  const api = 'http://localhost:8000/api/v1';

  const details = {
    id: 4,
    grade: '05',
    skill: 'OFFICE MANAGEMENT (9017)',
    bureau: '150000',
    organization: 'FREETOWN SIERRA LEONE (FREETOWN)',
    position_number: '00003026',
    is_overseas: true,
    create_date: '2006-09-20',
    update_date: '2017-06-08',
    post: { id: 162, tour_of_duty: '2YRR', code: 'LT6000000', description: 'MASERU, LESOTHO', cost_of_living_adjustment: 0, differential_rate: 15, danger_pay: 0, rest_relaxation_point: 'London', has_consumable_allowance: false, has_service_needs_differential: false },
    languages: [],
  };

  const detailsWithLanguages = {
    id: 5,
    grade: '05',
    skill: 'OFFICE MANAGEMENT (9017)',
    bureau: '150000',
    organization: 'FREETOWN SIERRA LEONE (FREETOWN)',
    position_number: '00003027',
    is_overseas: true,
    create_date: '2006-09-20',
    update_date: '2017-06-08',
    post: { id: 162, tour_of_duty: '2YRR', code: 'LT6000000', description: 'MASERU, LESOTHO', cost_of_living_adjustment: 0, differential_rate: 15, danger_pay: 0, rest_relaxation_point: 'London', has_consumable_allowance: false, has_service_needs_differential: false },
    languages: [{ id: 1, language: 'French (FR)', written_proficiency: '2', spoken_proficiency: '2', representation: 'French (FR) 2/2' }],
  };

  beforeEach(() => {
    const mockAdapter = new MockAdapter(axios);

    mockAdapter.onGet('http://localhost:8000/api/v1/position/?position_number=00003026').reply(200, [
      details,
    ],
    );

    mockAdapter.onGet('http://localhost:8000/api/v1/position/?position_number=00003027').reply(200, [
      detailsWithLanguages,
    ],
    );
  });

  it('is defined', (done) => {
    const context = createRouterContext();
    context.router.route.match.params.id = id;
    const wrapper = shallow(<Details api={api} />, { context });
    const f = () => {
      setTimeout(() => {
        expect(wrapper).toBeDefined();
        done();
      }, 0);
    };
    f();
  });

  it('can set state of details', (done) => {
    const context = createRouterContext();
    context.router.route.match.params.id = id;
    const wrapper = shallow(<Details api={api} />, { context });

    const f = () => {
      setTimeout(() => {
        expect(wrapper.instance().state.details.id).toBe(4);
        done();
      }, 0);
    };
    f();
  });

  it('can set state of details with languages', (done) => {
    const context = createRouterContext();
    context.router.route.match.params.id = idWithLang;
    const wrapper = shallow(<Details api={api} />, { context });

    const f = () => {
      setTimeout(() => {
        expect(wrapper.instance().state.details.id).toBe(5);
        done();
      }, 0);
    };
    f();
  });
});
