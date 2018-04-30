import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';

import Main from './Main';

describe('Main', () => {
  it('is defined', () => {
    const main = TestUtils.renderIntoDocument(<MemoryRouter>
      <Main />
    </MemoryRouter>);
    expect(main).toBeDefined();
  });

  it('handles a position details route', () => {
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
          { id: 1, language: 'French (FR)', reading_proficiency: '2', spoken_proficiency: '2', representation: 'French (FR) 2/2' },
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
      <Main results={resultsArray} />
    </MemoryRouter>);
    expect(main).toBeDefined();
  });
  it('handles a position details route', () => {
    const main = TestUtils.renderIntoDocument(<MemoryRouter initialEntries={['/details/00011111']}>
      <Main />
    </MemoryRouter>);
    expect(main).toBeDefined();
  });
  it('handles a profile/favorites route', () => {
    const main = TestUtils.renderIntoDocument(<MemoryRouter initialEntries={['/profile/favorites']}>
      <Main />
    </MemoryRouter>);
    expect(main).toBeDefined();
  });
  it('handles a profile/searches route', () => {
    const main = TestUtils.renderIntoDocument(<MemoryRouter initialEntries={['/profile/searches']}>
      <Main />
    </MemoryRouter>);
    expect(main).toBeDefined();
  });
  it('handles a profile/dashboard route', () => {
    const main = TestUtils.renderIntoDocument(<MemoryRouter initialEntries={['/profile/dashboard']}>
      <Main />
    </MemoryRouter>);
    expect(main).toBeDefined();
  });
  it('handles a profile/bidderportfolio route', () => {
    const main = TestUtils.renderIntoDocument(<MemoryRouter initialEntries={['/profile/bidderportfolio']}>
      <Main />
    </MemoryRouter>);
    expect(main).toBeDefined();
  });
  it('handles a profile/glossaryeditor route', () => {
    const main = TestUtils.renderIntoDocument(<MemoryRouter initialEntries={['/profile/glossaryeditor']}>
      <Main />
    </MemoryRouter>);
    expect(main).toBeDefined();
  });
  it('handles a profile/bidtracker route', () => {
    const main = TestUtils.renderIntoDocument(<MemoryRouter initialEntries={['/profile/bidtracker']}>
      <Main />
    </MemoryRouter>);
    expect(main).toBeDefined();
  });
  it('handles an about route', () => {
    const main = TestUtils.renderIntoDocument(<MemoryRouter initialEntries={['/about']}>
      <Main />
    </MemoryRouter>);
    expect(main).toBeDefined();
  });
});
