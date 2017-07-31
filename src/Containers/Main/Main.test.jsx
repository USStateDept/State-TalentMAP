import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Main from './Main';

describe('Main', () => {
  const api = 'http://localhost:8000/api/v1';

  beforeEach(() => {
    const mockAdapter = new MockAdapter(axios);

    const details = {
      id: 4,
      grade: '05',
      skill: 'OFFICE MANAGEMENT (9017)',
      bureau: '150000',
      organization: 'FREETOWN SIERRA LEONE (FREETOWN)',
      position_number: '00011111',
      is_overseas: true,
      create_date: '2006-09-20',
      update_date: '2017-06-08',
      languages: [],
    };

    mockAdapter.onGet('http://localhost:8000/api/v1/position/?position_number=00011111').reply(200, [
      details,
    ],
    );
  });

  it('is defined', () => {
    const main = TestUtils.renderIntoDocument(<MemoryRouter>
      <Main api={api} />
    </MemoryRouter>);
    expect(main).toBeDefined();
  });
  it('is handles a position details route', () => {
    const resultsArray = [
      { id: 6,
        grade: '05',
        skill: 'OFFICE MANAGEMENT (9017)',
        bureau: '150000',
        organization: 'YAOUNDE CAMEROON (YAOUNDE)',
        position_number: '00025003',
        is_overseas: true,
        create_date: '2006-09-20',
        update_date: '2017-06-08',
        post: { id: 162, tour_of_duty: '2YRR', code: 'LT6000000', description: 'MASERU, LESOTHO', cost_of_living_adjustment: 0, differential_rate: 15, danger_pay: 0, rest_relaxation_point: 'London', has_consumable_allowance: false, has_service_needs_differential: false },
        languages: [
          { id: 1, language: 'French (FR)', written_proficiency: '2', spoken_proficiency: '2', representation: 'French (FR) 2/2' },
        ],
      },
      { id: 60,
        grade: '03',
        skill: 'OFFICE MANAGEMENT (9017)',
        bureau: '150000',
        organization: 'YAOUNDE CAMEROON (YAOUNDE)',
        position_number: '00025003',
        is_overseas: true,
        create_date: '2006-09-20',
        update_date: '2017-06-08',
        post: { id: 162, tour_of_duty: '2YRR', code: 'LT6000000', description: 'MASERU, LESOTHO', cost_of_living_adjustment: 0, differential_rate: 15, danger_pay: 0, rest_relaxation_point: 'London', has_consumable_allowance: false, has_service_needs_differential: false },
        languages: [],
      },
    ];
    const main = TestUtils.renderIntoDocument(<MemoryRouter initialEntries={['/results']}>
      <Main api={api} results={resultsArray} />
    </MemoryRouter>);
    expect(main).toBeDefined();
  });
  it('is handles a position details route', () => {
    const main = TestUtils.renderIntoDocument(<MemoryRouter initialEntries={['/details/00011111']}>
      <Main api={api} />
    </MemoryRouter>);
    expect(main).toBeDefined();
  });
  it('is handles a post details route', () => {
    const main = TestUtils.renderIntoDocument(<MemoryRouter initialEntries={['/post/00011111']}>
      <Main api={api} />
    </MemoryRouter>);
    expect(main).toBeDefined();
  });
});
