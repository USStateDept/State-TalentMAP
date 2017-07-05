import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import Main from './Main';

describe('Main', () => {
  const api = 'http://localhost:8000/api/v1';

  it('is defined', () => {
    const main = TestUtils.renderIntoDocument(<MemoryRouter>
      <Main api={api} />
    </MemoryRouter>);
    expect(main).toBeDefined();
  });
  it('is handles a position details route', () => {
    const resultsArray = [
     { id: 6, grade: '05', skill: 'OFFICE MANAGEMENT (9017)', bureau: '150000', organization: 'YAOUNDE CAMEROON (YAOUNDE)', position_number: '00025003', is_overseas: true, create_date: '2006-09-20', update_date: '2017-06-08', languages: [{ id: 1, language: 'French (FR)', written_proficiency: '2', spoken_proficiency: '2', representation: 'French (FR) 2/2' }] },
     { id: 80, grade: '05', skill: 'INFORMATION MANAGEMENT (2880)', bureau: '110000', organization: 'SAO PAULO BRAZIL (SAO PAULO)', position_number: '55115002', is_overseas: true, create_date: '2006-09-20', update_date: '2017-06-08', languages: [{ id: 22, language: 'Portuguese (PY)', written_proficiency: '1', spoken_proficiency: '1', representation: 'Portuguese (PY) 1/1' }] },
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
